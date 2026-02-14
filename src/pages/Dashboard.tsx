import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff, Rocket, GitBranch, Server, Settings, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface EnvVar {
  id: string;
  key: string;
  value: string;
  visible: boolean;
}

type DeployStatus = "idle" | "deploying" | "success";

const Dashboard = () => {
  const [frontendRepo, setFrontendRepo] = useState("");
  const [backendRepo, setBackendRepo] = useState("");
  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { id: crypto.randomUUID(), key: "", value: "", visible: false },
  ]);
  const [deployStatus, setDeployStatus] = useState<DeployStatus>("idle");
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

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

  const simulateDeploy = () => {
    if (!frontendRepo) return;
    setDeployStatus("deploying");
    setDeployLogs([]);

    const logs = [
      "Connecting to VPS...",
      "Cloning frontend repository...",
      backendRepo ? "Cloning backend repository..." : null,
      "Installing dependencies...",
      "Setting environment variables...",
      "Building frontend...",
      backendRepo ? "Building backend..." : null,
      "Configuring Nginx reverse proxy...",
      "Generating SSL certificate...",
      "Starting services...",
      "Running health checks...",
      "Deployment successful! Your app is live.",
    ].filter(Boolean) as string[];

    logs.forEach((log, i) => {
      setTimeout(() => {
        setDeployLogs((prev) => [...prev, log]);
        if (i === logs.length - 1) {
          setDeployStatus("success");
        }
      }, (i + 1) * 700);
    });
  };

  return (
    <div className="min-h-screen bg-background hero-grid">
      {/* Top bar */}
      <div className="border-b border-border glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <span className="w-px h-5 bg-border" />
            <span className="font-heading text-lg font-bold">
              deploy<span className="gradient-text">flow</span>
            </span>
          </div>
          <span className="font-body text-xs text-muted-foreground">New Deployment</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            Deploy Your Project
          </h1>
          <p className="font-body text-muted-foreground mb-10">
            Connect your repositories, configure your environment, and ship to production.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Repository URLs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glow-card rounded-xl border border-border p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <GitBranch size={18} className="text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-semibold">Repositories</h2>
                <p className="font-body text-xs text-muted-foreground">
                  GitHub repository URLs for your project
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-body text-sm text-muted-foreground mb-1.5 block">
                  Frontend Repository <span className="text-primary">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/frontend-repo"
                  value={frontendRepo}
                  onChange={(e) => setFrontendRepo(e.target.value)}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground mb-1.5 block">
                  Backend Repository <span className="text-muted-foreground/40">(optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/backend-repo"
                  value={backendRepo}
                  onChange={(e) => setBackendRepo(e.target.value)}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Environment Variables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glow-card rounded-xl border border-border p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Settings size={18} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-semibold">Environment Variables</h2>
                  <p className="font-body text-xs text-muted-foreground">
                    Encrypted and injected at build time
                  </p>
                </div>
              </div>
              <button
                onClick={addEnvVar}
                className="flex items-center gap-1.5 font-body text-xs text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-lg border border-primary/20 hover:border-primary/40"
              >
                <Plus size={14} />
                Add
              </button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {envVars.map((envVar, index) => (
                  <motion.div
                    key={envVar.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3 items-start"
                  >
                    <input
                      type="text"
                      placeholder="KEY"
                      value={envVar.key}
                      onChange={(e) => updateEnvVar(envVar.id, "key", e.target.value)}
                      className="flex-1 bg-muted border border-border rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                    <div className="flex-[2] relative">
                      <input
                        type={envVar.visible ? "text" : "password"}
                        placeholder="value"
                        value={envVar.value}
                        onChange={(e) => updateEnvVar(envVar.id, "value", e.target.value)}
                        className="w-full bg-muted border border-border rounded-lg px-4 py-3 pr-10 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                      />
                      <button
                        onClick={() => toggleVisibility(envVar.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {envVar.visible ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    <button
                      onClick={() => removeEnvVar(envVar.id)}
                      disabled={envVars.length === 1 && !envVar.key && !envVar.value}
                      className="p-3 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={15} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Deploy Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button
              onClick={simulateDeploy}
              disabled={!frontendRepo || deployStatus === "deploying"}
              className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground py-4 rounded-xl font-body font-medium text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
          </motion.div>

          {/* Deploy Logs */}
          <AnimatePresence>
            {deployLogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/30" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <span className="ml-3 font-body text-xs text-muted-foreground flex items-center gap-2">
                    <Server size={12} />
                    Deployment Logs
                  </span>
                </div>
                <div className="p-6 font-mono text-sm space-y-1.5 max-h-80 overflow-y-auto">
                  {deployLogs.map((log, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
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
                      <span className="inline-block w-2 h-4 bg-primary animate-terminal-blink" />
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
