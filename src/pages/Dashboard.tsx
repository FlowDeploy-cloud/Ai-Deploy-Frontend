import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff, Rocket, GitBranch, Server, Settings, Loader2, CheckCircle2, LogOut, User, Play, Square, RotateCw, ExternalLink, Globe, Activity, List, Terminal, FileUp, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { deploymentApi, connectWebSocket, getToken } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface EnvVar {
  id: string;
  key: string;
  value: string;
  visible: boolean;
}

interface Deployment {
  _id: string;
  deployment_id: string;
  user_id: string;
  name: string;
  subdomain: string;
  frontend_repo: string;
  backend_repo?: string;
  frontend_port?: number;
  backend_port?: number;
  frontend_allocated_port?: number;
  backend_allocated_port?: number;
  frontend_actual_port?: number;
  backend_actual_port?: number;
  frontend_url?: string;
  backend_url?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

type DeployStatus = "idle" | "deploying" | "success";
type ActiveView = "deployments" | "deploy";

const Dashboard = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeView, setActiveView] = useState<ActiveView>("deploy");
  const [projectName, setProjectName] = useState("");
  const [frontendRepo, setFrontendRepo] = useState("");
  const [backendRepo, setBackendRepo] = useState("");
  const [frontendDescription, setFrontendDescription] = useState("");
  const [backendDescription, setBackendDescription] = useState("");
  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { id: crypto.randomUUID(), key: "", value: "", visible: false },
  ]);
  const [deployStatus, setDeployStatus] = useState<DeployStatus>("idle");
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [currentDeploymentId, setCurrentDeploymentId] = useState<string | null>(null);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loadingDeployments, setLoadingDeployments] = useState(true);
  const [wsConnection, setWsConnection] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not authenticated (after loading completes)
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Fetch user's deployments
  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const response = await deploymentApi.getAll();
        if (response.success && response.data) {
          setDeployments(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch deployments:', error);
      } finally {
        setLoadingDeployments(false);
      }
    };

    if (isAuthenticated) {
      fetchDeployments();
    }
  }, [isAuthenticated]);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsConnection) {
        wsConnection.disconnect();
      }
    };
  }, [wsConnection]);

  const addEnvVar = () => {
    setEnvVars((prev) => [
      ...prev,
      { id: crypto.randomUUID(), key: "", value: "", visible: false },
    ]);
  };

  const removeEnvVar = (id: string) => {
    setEnvVars((prev) => prev.filter((v) => v.id !== id));
  };

  const updateEnvVar = (id: string, field: "key" | "value", val: string) => {
    setEnvVars((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
  };

  const toggleVisibility = (id: string) => {
    setEnvVars((prev) =>
      prev.map((v) => (v.id === id ? { ...v, visible: !v.visible } : v))
    );
  };

  const parseEnvFile = (content: string) => {
    const lines = content.split('\n');
    const parsed: EnvVar[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      // Find the first = sign
      const equalIndex = trimmed.indexOf('=');
      if (equalIndex === -1) continue;
      
      const key = trimmed.substring(0, equalIndex).trim();
      let value = trimmed.substring(equalIndex + 1).trim();
      
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      if (key) {
        parsed.push({
          id: crypto.randomUUID(),
          key,
          value,
          visible: false
        });
      }
    }

    return parsed;
  };

  const handleEnvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = parseEnvFile(content);
      
      if (parsed.length > 0) {
        setEnvVars(parsed);
        toast({
          title: 'Success!',
          description: `Loaded ${parsed.length} environment variables from ${file.name}`,
        });
      } else {
        toast({
          title: 'No variables found',
          description: 'The .env file appears to be empty or invalid',
          variant: 'destructive',
        });
      }
    };
    
    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to read the .env file',
        variant: 'destructive',
      });
    };
    
    reader.readAsText(file);
    
    // Reset input so the same file can be uploaded again
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDeploy = async () => {
    if (!projectName) {
      toast({
        title: "Missing information",
        description: "Please fill in project name",
        variant: "destructive",
      });
      return;
    }

    if (!frontendRepo && !backendRepo) {
      toast({
        title: "Missing information",
        description: "Please provide at least one repository (frontend or backend)",
        variant: "destructive",
      });
      return;
    }

    setDeployStatus("deploying");
    setDeployLogs([]);

    // Convert envVars to object
    const envVarsObj: Record<string, string> = {};
    envVars.forEach((v) => {
      if (v.key && v.value) {
        envVarsObj[v.key] = v.value;
      }
    });

    const deployData: any = {
      name: projectName,
      env_vars: envVarsObj,
    };

    if (frontendRepo) {
      deployData.frontend_repo = frontendRepo;
    }
    if (backendRepo) {
      deployData.backend_repo = backendRepo;
    }
    if (frontendDescription) {
      deployData.frontend_description = frontendDescription;
    }
    if (backendDescription) {
      deployData.backend_description = backendDescription;
    }

    try {
      const response = await deploymentApi.create(deployData);

      if (response.success && response.data) {
        const deploymentId = response.data.deployment_id;
        setCurrentDeploymentId(deploymentId);

        toast({
          title: "Deployment started!",
          description: "Your project is being deployed",
        });

        // Connect to WebSocket for real-time logs
        const token = getToken();
        if (token) {
          // Disconnect existing connection if any
          if (wsConnection) {
            wsConnection.disconnect();
          }

          const ws = connectWebSocket(token, deploymentId, (data) => {
            console.log('📥 Received WebSocket data:', data);
            
            if (data.type === 'log') {
              setDeployLogs((prev) => [...prev, data.message || '']);
            } else if (data.type === 'status') {
              if (data.status === 'deployed') {
                setDeployStatus('success');
                
                // Build detailed success message
                const deployment = data.deployment;
                let description = '';
                if (deployment?.frontend_url) {
                  description += `Frontend: ${deployment.frontend_url}`;
                  if (deployment.frontend_actual_port) {
                    description += ` (Port: ${deployment.frontend_actual_port}`;
                    if (deployment.frontend_allocated_port !== deployment.frontend_actual_port) {
                      description += ` ✨ auto-detected from ${deployment.frontend_allocated_port}`;
                    }
                    description += ')';
                  }
                }
                if (deployment?.backend_url) {
                  if (description) description += ' | ';
                  description += `Backend: ${deployment.backend_url}`;
                  if (deployment.backend_actual_port) {
                    description += ` (Port: ${deployment.backend_actual_port}`;
                    if (deployment.backend_allocated_port !== deployment.backend_actual_port) {
                      description += ` ✨ auto-detected from ${deployment.backend_allocated_port}`;
                    }
                    description += ')';
                  }
                }

                toast({
                  title: "✅ Deployment successful!",
                  description: description || `Your app is live at ${data.url}`,
                  duration: 10000,
                });
                
                // Refresh deployments list
                fetchDeployments();
                
                // Disconnect WebSocket after success
                setTimeout(() => {
                  if (ws) ws.disconnect();
                  setWsConnection(null);
                }, 2000);
              } else if (data.status === 'failed') {
                setDeployStatus('idle');
                toast({
                  title: "Deployment failed",
                  description: "Check the logs for more information",
                  variant: "destructive",
                });
                
                // Disconnect WebSocket after failure
                setTimeout(() => {
                  if (ws) ws.disconnect();
                  setWsConnection(null);
                }, 2000);
              }
            }
          });

          setWsConnection(ws);
        }
      } else {
        setDeployStatus('idle');
        toast({
          title: "Deployment failed",
          description: response.error || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      setDeployStatus('idle');
      toast({
        title: "Deployment error",
        description: "Failed to start deployment",
        variant: "destructive",
      });
    }
  };

  const handleStop = async (id: string, name: string) => {
    try {
      const response = await deploymentApi.stop(id);
      if (response.success) {
        toast({
          title: "Deployment stopped",
          description: `${name} has been stopped`,
        });
        fetchDeployments();
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      toast({
        title: "Failed to stop deployment",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleRestart = async (id: string, name: string) => {
    try {
      const response = await deploymentApi.restart(id);
      if (response.success) {
        toast({
          title: "Deployment restarted",
          description: `${name} has been restarted`,
        });
        fetchDeployments();
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      toast({
        title: "Failed to restart deployment",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deploymentApi.delete(id);
      if (response.success) {
        toast({
          title: "Deployment deleted",
          description: `${name} has been removed`,
        });
        fetchDeployments();
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      toast({
        title: "Failed to delete deployment",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const fetchDeployments = async () => {
    try {
      const response = await deploymentApi.getAll();
      if (response.success && response.data) {
        setDeployments(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch deployments:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'text-green-500';
      case 'deploying':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      case 'stopped':
        return 'text-gray-500';
      default:
        return 'text-muted-foreground';
    }
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen bg-background hero-grid flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="font-body text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background hero-grid flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="border-b border-border glass flex-shrink-0">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-heading text-base sm:text-lg font-bold">
              deploy<span className="gradient-text">flow</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <User size={16} className="text-muted-foreground" />
              <span className="font-body text-foreground">{user?.username}</span>
              <span className="text-muted-foreground">({user?.plan})</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-destructive transition-colors font-body text-xs sm:text-sm p-2 sm:p-0"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Sidebar - Desktop */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:flex w-64 border-r border-border glass flex-col"
        >
          <div className="p-6">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Navigation
            </h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveView("deploy")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all ${
                  activeView === "deploy"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Rocket size={18} />
                Deploy
              </button>
              <button
                onClick={() => setActiveView("deployments")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all ${
                  activeView === "deployments"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <List size={18} />
                Deployments
                {deployments.length > 0 && (
                  <span className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                    {deployments.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-64 border-r border-border glass z-50 flex flex-col"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Navigation
                    </h2>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X size={20} />
                    </button>
                  </div>
                  <nav className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveView("deploy");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all ${
                        activeView === "deploy"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Rocket size={18} />
                      Deploy
                    </button>
                    <button
                      onClick={() => {
                        setActiveView("deployments");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-all ${
                        activeView === "deployments"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <List size={18} />
                      Deployments
                      {deployments.length > 0 && (
                        <span className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                          {deployments.length}
                        </span>
                      )}
                    </button>
                  </nav>
                  
                  {/* Mobile User Info */}
                  <div className="mt-8 pt-6 border-t border-border md:hidden">
                    <div className="flex items-center gap-2 text-sm mb-4">
                      <User size={16} className="text-muted-foreground" />
                      <span className="font-body text-foreground">{user?.username}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Plan: <span className="text-primary">{user?.plan}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          <AnimatePresence mode="wait">
            {activeView === "deployments" && (
              <motion.div
                key="deployments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto"
              >
                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
                  <div className="mb-6 sm:mb-8">
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Your Deployments</h1>
                    <p className="font-body text-muted-foreground">
                      Manage and monitor your deployed projects
                    </p>
                  </div>

                  {loadingDeployments ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 size={32} className="animate-spin text-primary" />
                    </div>
                  ) : deployments.length === 0 ? (
                    <div className="text-center py-12 glow-card rounded-xl border border-border p-12">
                      <Activity size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-heading text-lg font-semibold mb-2">No deployments yet</h3>
                      <p className="font-body text-sm text-muted-foreground mb-6">
                        Get started by deploying your first project
                      </p>
                      <button
                        onClick={() => setActiveView("deploy")}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-medium text-sm hover:opacity-90 transition-all"
                      >
                        <Rocket size={16} />
                        Deploy Now
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {deployments.map((deployment) => (
                        <motion.div
                          key={deployment._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glow-card rounded-xl border border-border p-4 sm:p-6 hover:border-primary/30 transition-all"
                        >
                          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="flex-1 w-full sm:w-auto space-y-3">
                              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">
                                  {deployment.name}
                                </h3>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  deployment.status === 'deployed' ? 'bg-green-500/10 text-green-500' :
                                  deployment.status === 'deploying' ? 'bg-yellow-500/10 text-yellow-500' :
                                  deployment.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                                  'bg-gray-500/10 text-gray-500'
                                }`}>
                                  {deployment.status}
                                </span>
                              </div>

                              <div className="space-y-2">
                                {deployment.frontend_url && (
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm break-all">
                                    <Globe size={14} className="text-primary" />
                                    <a
                                      href={deployment.frontend_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline flex items-center gap-1 font-mono text-xs"
                                    >
                                      {deployment.frontend_url}
                                      <ExternalLink size={12} />
                                    </a>
                                    {deployment.frontend_port && (
                                      <span className="text-muted-foreground text-xs">
                                        Port: {deployment.frontend_port}
                                        {deployment.frontend_allocated_port && 
                                         deployment.frontend_allocated_port !== deployment.frontend_port && (
                                          <span className="text-yellow-500" title="Port auto-detected">
                                            {" "}(allocated: {deployment.frontend_allocated_port})
                                          </span>
                                        )}
                                      </span>
                                    )}
                                  </div>
                                )}
                                {deployment.backend_url && (
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm break-all">
                                    <Server size={14} className="text-primary" />
                                    <a
                                      href={deployment.backend_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline flex items-center gap-1 font-mono text-xs"
                                    >
                                      {deployment.backend_url}
                                      <ExternalLink size={12} />
                                    </a>
                                    {deployment.backend_port && (
                                      <span className="text-muted-foreground text-xs">
                                        Port: {deployment.backend_port}
                                        {deployment.backend_allocated_port && 
                                         deployment.backend_allocated_port !== deployment.backend_port && (
                                          <span className="text-yellow-500" title="Port auto-detected">
                                            {" "}(allocated: {deployment.backend_allocated_port})
                                          </span>
                                        )}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>Subdomain: {deployment.subdomain}</span>
                                <span>•</span>
                                <span>{new Date(deployment.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                              {deployment.status === 'deployed' && (
                                <button
                                  onClick={() => handleStop(deployment.deployment_id, deployment.name)}
                                  className="p-2 text-muted-foreground hover:text-yellow-500 transition-colors"
                                  title="Stop deployment"
                                >
                                  <Square size={16} />
                                </button>
                              )}
                              {deployment.status === 'stopped' && (
                                <button
                                  onClick={() => handleRestart(deployment.deployment_id, deployment.name)}
                                  className="p-2 text-muted-foreground hover:text-green-500 transition-colors"
                                  title="Start deployment"
                                >
                                  <Play size={16} />
                                </button>
                              )}
                              {deployment.status === 'deployed' && (
                                <button
                                  onClick={() => handleRestart(deployment.deployment_id, deployment.name)}
                                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                  title="Restart deployment"
                                >
                                  <RotateCw size={16} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(deployment.deployment_id, deployment.name)}
                                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                title="Delete deployment"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeView === "deploy" && (
              <motion.div
                key="deploy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-hidden flex"
              >
                {/* Deploy Form - Shrinks when deploying */}
                <motion.div
                  animate={{
                    width: deployStatus === "deploying" && deployLogs.length > 0 ? "40%" : "100%",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-y-auto border-r border-border"
                >
                  <div className={`container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-3xl ${
                    deployStatus === "deploying" && deployLogs.length > 0 ? "pb-[45vh] md:pb-6 sm:md:pb-8" : ""
                  }`}>
                    <div className="mb-6 sm:mb-8">
                      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Deploy Your Project</h1>
                      <p className="font-body text-muted-foreground">
                        Connect your repositories, configure environment, and ship to production
                      </p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      {/* Repository URLs */}
                      <div className="glow-card rounded-xl border border-border p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <GitBranch size={16} className="text-primary" />
                          </div>
                          <div>
                            <h2 className="font-heading text-base font-semibold">Repositories</h2>
                            <p className="font-body text-xs text-muted-foreground">
                              At least one repository required
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="font-body text-xs text-muted-foreground mb-1.5 block">
                              Project Name <span className="text-primary">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="my-awesome-project"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                              className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                          </div>
                          <div>
                            <label className="font-body text-xs text-muted-foreground mb-1.5 block">
                              Frontend Repository <span className="text-muted-foreground/40">(optional)</span>
                            </label>
                            <input
                              type="url"
                              placeholder="https://github.com/username/frontend-repo"
                              value={frontendRepo}
                              onChange={(e) => setFrontendRepo(e.target.value)}
                              className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                          </div>
                          <div>
                            <label className="font-body text-xs text-muted-foreground mb-1.5 block">
                              Backend Repository <span className="text-muted-foreground/40">(optional)</span>
                            </label>
                            <input
                              type="url"
                              placeholder="https://github.com/username/backend-repo"
                              value={backendRepo}
                              onChange={(e) => setBackendRepo(e.target.value)}
                              className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Environment Variables */}
                      <div className="glow-card rounded-xl border border-border p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Settings size={16} className="text-primary" />
                            </div>
                            <div>
                              <h2 className="font-heading text-base font-semibold">Environment Variables</h2>
                              <p className="font-body text-xs text-muted-foreground">
                                Optional configuration
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept=".env"
                              onChange={handleEnvFileUpload}
                              className="hidden"
                            />
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary/40"
                              title="Upload .env file"
                            >
                              <FileUp size={14} />
                              Upload .env
                            </button>
                            <button
                              onClick={addEnvVar}
                              className="flex items-center gap-1.5 font-body text-xs text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg border border-primary/20 hover:border-primary/40"
                            >
                              <Plus size={14} />
                              Add
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <AnimatePresence>
                            {envVars.map((envVar) => (
                              <motion.div
                                key={envVar.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-start"
                              >
                                <input
                                  type="text"
                                  placeholder="KEY"
                                  value={envVar.key}
                                  onChange={(e) => updateEnvVar(envVar.id, "key", e.target.value)}
                                  className="flex-1 sm:flex-1 bg-muted border border-border rounded-lg px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                />
                                <div className="flex-1 sm:flex-[2] relative">
                                  <input
                                    type={envVar.visible ? "text" : "password"}
                                    placeholder="value"
                                    value={envVar.value}
                                    onChange={(e) => updateEnvVar(envVar.id, "value", e.target.value)}
                                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 pr-8 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                  />
                                  <button
                                    onClick={() => toggleVisibility(envVar.id)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {envVar.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeEnvVar(envVar.id)}
                                  disabled={envVars.length === 1 && !envVar.key && !envVar.value}
                                  className="p-2 self-center sm:self-start text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Deploy Button */}
                      <button
                        onClick={handleDeploy}
                        disabled={(!frontendRepo && !backendRepo) || !projectName || deployStatus === "deploying"}
                        className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-3.5 rounded-xl font-body font-medium text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {deployStatus === "deploying" ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Deploying...
                          </>
                        ) : deployStatus === "success" ? (
                          <>
                            <CheckCircle2 size={18} />
                            Deployed Successfully
                          </>
                        ) : (
                          <>
                            <Rocket size={18} />
                            Deploy to Production
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Logs Panel - Shows when deploying */}
                <AnimatePresence>
                  {deployStatus === "deploying" && deployLogs.length > 0 && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "60%", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="hidden md:flex overflow-hidden bg-card"
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                          <Terminal size={16} className="text-primary" />
                          <span className="font-body text-sm font-semibold">Deployment Logs</span>
                          <div className="ml-auto flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs text-muted-foreground">Live</span>
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1">
                          {deployLogs.map((log, i) => (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              className={
                                i === deployLogs.length - 1 && deployStatus === "success"
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground"
                              }
                            >
                              <span className="text-primary mr-2">{">"}</span>
                              {log}
                            </motion.p>
                          ))}
                          {deployStatus === "deploying" && (
                            <p className="text-muted-foreground">
                              <span className="text-primary mr-2">{">"}</span>
                              <span className="inline-block w-2 h-3 bg-primary animate-terminal-blink" />
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Logs Panel - Fixed Bottom */}
      <AnimatePresence>
        {deployStatus === "deploying" && deployLogs.length > 0 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border"
            style={{ maxHeight: "40vh" }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <Terminal size={14} className="text-primary" />
                <span className="font-body text-xs font-semibold">Deployment Logs</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] text-muted-foreground">Live</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 font-mono text-[10px] space-y-0.5">
                {deployLogs.map((log, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      i === deployLogs.length - 1 && deployStatus === "success"
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    <span className="text-primary mr-1.5">{">"}</span>
                    {log}
                  </motion.p>
                ))}
                {deployStatus === "deploying" && (
                  <p className="text-muted-foreground">
                    <span className="text-primary mr-1.5">{">"}</span>
                    <span className="inline-block w-1.5 h-2.5 bg-primary animate-terminal-blink" />
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
