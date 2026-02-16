import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);
      
      // Get the GitHub authorization URL
      const response = await authApi.getGithubAuthUrl();
      
      if (response.success && response.data) {
        // Redirect to GitHub OAuth
        const data = response.data as { url: string };
        window.location.href = data.url;
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to initiate GitHub login",
          variant: "destructive",
        });
        setIsGithubLoading(false);
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      toast({
        title: "Error",
        description: "Failed to connect to GitHub",
        variant: "destructive",
      });
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-sm">⚡</span>
          </div>
          <h1 className="font-heading text-base font-semibold">
            deploy<span className="gradient-text">flow</span>
          </h1>
        </Link>

        {/* Content Card */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold mb-1">Welcome back</h2>
            <p className="text-xs text-muted-foreground">Sign in to continue to your dashboard</p>
          </div>

          <Button
            type="button"
            variant="default"
            className="w-full h-10 text-sm font-medium"
            onClick={handleGithubLogin}
            disabled={isGithubLoading}
          >
            {isGithubLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
