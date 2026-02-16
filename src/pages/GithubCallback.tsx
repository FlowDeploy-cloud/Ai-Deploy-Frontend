import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { authApi, setToken, setUser } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface GithubAuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    plan: string;
    max_deployments: number;
    api_key: string;
    github_username?: string;
    avatar_url?: string;
    auth_provider?: 'local' | 'github';
  };
}

const GithubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser: setAuthUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Authenticating with GitHub...');
  
  // Prevent double execution
  const hasRun = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent duplicate execution (React 18 StrictMode runs effects twice in dev)
      if (hasRun.current) {
        console.log('GitHub callback already processed, skipping...');
        return;
      }
      hasRun.current = true;

      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage('GitHub authentication was cancelled or failed');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      try {
        console.log('Exchanging GitHub authorization code...');
        
        // Exchange code for token
        const response = await authApi.githubCallback(code);

        if (response.success && response.data) {
          // Store token and user data
          const data = response.data as GithubAuthResponse;
          setToken(data.token);
          setUser(data.user);
          
          // Update auth context
          setIsAuthenticated(true);
          setAuthUser(data.user);

          setStatus('success');
          setMessage('Authentication successful! Redirecting to dashboard...');
          
          // Redirect to dashboard after a short delay
          setTimeout(() => navigate('/dashboard'), 1500);
        } else {
          throw new Error(response.error || 'Authentication failed');
        }
      } catch (error) {
        console.error('GitHub callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to authenticate with GitHub');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, setIsAuthenticated, setAuthUser]);

  return (
    <div className="min-h-screen bg-background hero-grid flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="glass border-border/50 rounded-xl p-8 space-y-6">
          {status === 'loading' && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Connecting to GitHub</h2>
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-green-500">Success!</h2>
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-destructive">Authentication Failed</h2>
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GithubCallback;
