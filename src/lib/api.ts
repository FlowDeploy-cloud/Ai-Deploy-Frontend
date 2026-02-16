import { io, Socket } from 'socket.io-client';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://160.250.204.184:3102/api';

// Auth storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// Get stored token
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Set token
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Remove token
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// User interface
interface User {
  id: string;
  username: string;
  email: string;
  plan: string;
  max_deployments: number;
  api_key: string;
  createdAt?: string;
}

// Get stored user
export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Set user
export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// API Response type
interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}

// Base fetch function with auth
const apiFetch = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'An error occurred',
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
};

// Auth API
export const authApi = {
  // Sign up
  signup: async (data: {
    username: string;
    email: string;
    password: string;
    plan?: string;
  }) => {
    return apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Login
  login: async (data: { email: string; password: string }) => {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get profile
  getProfile: async () => {
    return apiFetch('/auth/profile');
  },

  // Regenerate API key
  regenerateApiKey: async () => {
    return apiFetch('/auth/regenerate-api-key', {
      method: 'POST',
    });
  },

  // Change password
  changePassword: async (data: { oldPassword: string; newPassword: string }) => {
    return apiFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Deployment API
export const deploymentApi = {
  // Create deployment
  create: async (data: {
    name: string;
    frontend_repo?: string;
    backend_repo?: string;
    frontend_description?: string;
    backend_description?: string;
    env_vars?: Record<string, string>;
  }) => {
    return apiFetch('/deployments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get all deployments
  getAll: async (params?: { limit?: number; offset?: number }) => {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    return apiFetch(`/deployments${query ? `?${query}` : ''}`);
  },

  // Get single deployment
  getById: async (id: string) => {
    return apiFetch(`/deployments/${id}`);
  },

  // Stop deployment
  stop: async (id: string) => {
    return apiFetch(`/deployments/${id}/stop`, {
      method: 'POST',
    });
  },

  // Restart deployment
  restart: async (id: string) => {
    return apiFetch(`/deployments/${id}/restart`, {
      method: 'POST',
    });
  },

  // Delete deployment
  delete: async (id: string) => {
    return apiFetch(`/deployments/${id}`, {
      method: 'DELETE',
    });
  },

  // Get deployment logs
  getLogs: async (id: string) => {
    return apiFetch(`/deployments/${id}/logs`);
  },

  // Get PM2 logs
  getPM2Logs: async (id: string) => {
    return apiFetch(`/deployments/${id}/pm2-logs`);
  },
};

// User API
export const userApi = {
  // Get user stats
  getStats: async () => {
    return apiFetch('/user/stats');
  },

  // Update plan
  updatePlan: async (plan: string) => {
    return apiFetch('/user/plan', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    });
  },
};

// Subscription API
export const subscriptionApi = {
  // Get subscription warnings
  getWarnings: async () => {
    return apiFetch('/subscription/warnings');
  },
};

// Socket.IO connection for real-time logs
interface LogMessage {
  type: string;
  message?: string;
  status?: string;
  url?: string;
  deployment?: Record<string, unknown>;
  timestamp?: string;
}

let socketInstance: Socket | null = null;

export const connectWebSocket = (
  token: string,
  deploymentId: string,
  onMessage: (log: LogMessage) => void
): Socket => {
  // Disconnect existing socket if any
  if (socketInstance) {
    socketInstance.disconnect();
  }

  // Get base URL without /api
  const baseUrl = API_URL.replace('/api', '');
  
  // Connect to Socket.IO server
  socketInstance = io(baseUrl, {
    auth: {
      token: token
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });

  // Handle connection
  socketInstance.on('connect', () => {
    console.log('🔌 Connected to Socket.IO server');
  });

  // Handle log messages
  socketInstance.on('log', (data: LogMessage) => {
    console.log('📢 Received log:', data);
    onMessage({ ...data, type: 'log' });
  });

  // Handle status updates
  socketInstance.on('status', (data: Record<string, unknown>) => {
    console.log('📢 Received status:', data);
    onMessage(data as unknown as LogMessage);
  });

  // Handle deployment completion
  socketInstance.on('deployment_complete', (data: Record<string, unknown>) => {
    console.log('✅ Deployment complete:', data);
    const deployment = data.deployment as Record<string, unknown>;
    onMessage({ 
      type: 'status', 
      status: 'deployed', 
      deployment,
      url: (deployment?.frontend_url as string) || (deployment?.backend_url as string)
    });
  });

  // Handle deployment failure
  socketInstance.on('deployment_failed', (data: Record<string, unknown>) => {
    console.log('❌ Deployment failed:', data);
    onMessage({ 
      type: 'status', 
      status: 'failed', 
      ...data 
    } as LogMessage);
  });

  // Handle errors
  socketInstance.on('connect_error', (error) => {
    console.error('❌ Socket.IO connection error:', error);
  });

  socketInstance.on('disconnect', (reason) => {
    console.log('🔌 Disconnected from Socket.IO server:', reason);
  });

  return socketInstance;
};

export default {
  authApi,
  deploymentApi,
  userApi,
  subscriptionApi,
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  connectWebSocket,
};
