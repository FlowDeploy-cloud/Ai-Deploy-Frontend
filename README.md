# 🚀 ClawDeploy - Frontend

Modern, responsive frontend for ClawDeploy - an AI-powered deployment platform built with React, TypeScript, and Vite. Deploy your full-stack applications with ease through an intuitive dashboard interface.

## ✨ Features

### Core Features
- 🎨 **Modern UI/UX** - Beautiful interface built with Tailwind CSS and Shadcn UI
- 🔐 **Authentication** - Local and GitHub OAuth authentication
- 📊 **Dashboard** - Comprehensive deployment management dashboard
- 🚀 **One-Click Deploy** - Deploy applications directly from GitHub repositories
- 📈 **Real-time Monitoring** - Live deployment logs via WebSocket
- 💳 **Payment Integration** - Razorpay payment gateway for subscriptions
- 📱 **Responsive Design** - Fully responsive, mobile-first design
- 🌓 **Dark Mode Ready** - Theme support for light/dark modes

### User Features
- 🔗 **GitHub Integration** - Browse and select repositories directly
- ⚙️ **Environment Variables** - Secure configuration management
- 📝 **Deployment Logs** - Real-time log streaming and history
- 🔄 **Deployment Controls** - Start, stop, restart, and delete deployments
- 💰 **Subscription Management** - View plans, upgrade, and manage billing
- 👤 **Profile Management** - User settings and API key generation
- 📱 **Mobile Menu** - Touch-optimized navigation

## 🛠️ Tech Stack

### Core
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite 5
- **Package Manager:** npm / bun

### UI & Styling
- **CSS Framework:** Tailwind CSS
- **Component Library:** Shadcn UI (Radix UI primitives)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Themes:** next-themes

### State & Data
- **HTTP Client:** Axios (via api.ts)
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Query Management:** TanStack Query (React Query)
- **Real-time:** Socket.io Client

### Routing & Navigation
- **Router:** React Router DOM v6

### Development Tools
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint
- **Type Checking:** TypeScript

## 📋 Prerequisites

- **Node.js** 16+ or **Bun** 1.0+
- **npm**, **yarn**, or **bun** package manager
- Backend API running (see backend README)

## 🚀 Installation

### 1. Clone and Install Dependencies

```bash
# Navigate to frontend directory
cd deploy-ease

# Install dependencies with npm
npm install

# Or with bun (faster)
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Create environment file
cp .env.example .env

# Edit with your configuration
nano .env
```

```env
# API Configuration
VITE_API_URL=http://160.250.204.184:3102/api
# Or for local development:
# VITE_API_URL=http://localhost:4000/api

# Razorpay (for production)
VITE_RAZORPAY_KEY_ID=rzp_live_SGJbNLuvOZe9Ht
# For testing:
# VITE_RAZORPAY_KEY_ID=rzp_test_xxx
```

### 3. Development Server

```bash
# Start development server with npm
npm run dev

# Or with bun
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
# Build with npm
npm run build

# Or with bun
bun run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
deploy-ease/
├── public/
│   ├── robots.txt              # SEO configuration
│   └── favicon.ico
├── src/
│   ├── assets/                 # Static assets (images, fonts)
│   ├── components/            
│   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (30+ components)
│   │   ├── Features.tsx        # Landing page features
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── HowItWorks.tsx      # How it works section
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Pricing.tsx         # Pricing section
│   │   └── SEO.tsx             # SEO component
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   └── use-toast.ts        # Toast notifications
│   ├── lib/
│   │   ├── api.ts              # API client & endpoints
│   │   └── utils.ts            # Utility functions
│   ├── pages/
│   │   ├── Dashboard.tsx       # Main dashboard (1900+ lines)
│   │   ├── DocsPage.tsx        # Documentation page
│   │   ├── GithubCallback.tsx  # GitHub OAuth callback
│   │   ├── Index.tsx           # Landing page
│   │   ├── Login.tsx           # Login page
│   │   ├── NotFound.tsx        # 404 page
│   │   ├── PricingPage.tsx     # Pricing page
│   │   ├── PrivacyPage.tsx     # Privacy policy
│   │   ├── Signup.tsx          # Signup page
│   │   └── TermsPage.tsx       # Terms of service
│   ├── test/
│   │   ├── example.test.ts     # Example test
│   │   └── setup.ts            # Test setup
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── index.css               # Global styles
│   ├── main.tsx                # App entry point
│   └── vite-env.d.ts           # Vite types
├── .env                        # Environment variables
├── .gitignore
├── components.json             # Shadcn UI config
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json
├── postcss.config.js           # PostCSS config
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
├── vitest.config.ts            # Vitest config
└── README.md
```

## 🔌 API Integration

The frontend communicates with the backend through the API client defined in `src/lib/api.ts`.

### API Client Usage

```typescript
import { authApi, deploymentApi, subscriptionApi } from '@/lib/api';

// Authentication
const response = await authApi.login({
  email: 'user@example.com',
  password: 'password'
});

// Create deployment
const deployment = await deploymentApi.create({
  name: 'My App',
  frontend_repo: 'https://github.com/user/repo',
  frontend_description: 'React app'
});

// Get subscriptions
const subscription = await subscriptionApi.get();
```

### WebSocket Connection

```typescript
import { connectWebSocket } from '@/lib/api';

const ws = connectWebSocket('deployment_id');

ws.on('log', (data) => {
  console.log(data.message);
});

ws.on('deployment_complete', (data) => {
  console.log('Deployment finished!');
});
```

## 🎨 UI Components

This project uses [Shadcn UI](https://ui.shadcn.com/) components built on Radix UI primitives.

### Available Components

- **Layout:** Card, Separator, Tabs, Accordion, Collapsible
- **Forms:** Input, Select, Checkbox, Radio, Switch, Textarea, Form
- **Overlays:** Dialog, Alert Dialog, Drawer, Popover, Tooltip, Hover Card
- **Navigation:** Navigation Menu, Menubar, Breadcrumb
- **Feedback:** Toast, Alert, Progress, Badge
- **Data Display:** Table, Avatar, Calendar, Chart
- **Controls:** Button, Dropdown Menu, Context Menu, Toggle
- **Advanced:** Command, Carousel, Resizable Panels

### Adding New Components

```bash
# Add a new Shadcn component
npx shadcn-ui@latest add [component-name]

# Example: Add a data table
npx shadcn-ui@latest add table
```

## 🧪 Testing

```bash
# Run tests once
npm run test

# Watch mode for development
npm run test:watch

# Run with coverage
npm run test -- --coverage
```

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## 🌐 Deployment

### Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Or connect GitHub repo to Netlify:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: Add `VITE_API_URL`

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configure in vercel.json:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "env": {
       "VITE_API_URL": "https://api.your-domain.com/api"
     }
   }
   ```

### Deploy to Custom Server

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder to your server:**
   ```bash
   scp -r dist/* user@server:/var/www/html/
   ```

3. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name flowdeploy.cloud;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # API proxy (optional)
       location /api {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable and restart Nginx:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/flowdeploy /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Environment Variables for Production

```env
# Production API URL
VITE_API_URL=https://api.flowdeploy.cloud/api

# Razorpay Live Keys
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 5173)
npm run build            # Build for production
npm run build:dev        # Build with development mode
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run tests once
npm run test:watch       # Run tests in watch mode
```

## 🎯 Key Features Implementation

### Authentication Flow

1. User signs up/logs in via `/login` or `/signup`
2. JWT token stored in localStorage
3. AuthContext provides authentication state
4. Protected routes redirect to login if not authenticated
5. GitHub OAuth via `/auth/github/callback`

### Deployment Flow

1. User enters project details and GitHub repo
2. Frontend creates deployment via API
3. WebSocket connection established for real-time logs
4. Backend processes deployment using ClawdBot AI
5. User receives deployment URL and status updates
6. Real-time log streaming in dashboard

### Subscription & Payment

1. User selects plan from pricing page
2. Razorpay payment modal opens
3. Payment verified via backend webhook
4. Subscription activated automatically
5. Dashboard shows subscription status and warnings

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with bun
rm -rf node_modules bun.lockb
bun install
```

### API Connection Issues

- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check CORS configuration in backend
- Inspect network tab in browser DevTools

### GitHub OAuth Redirect Mismatch

- Verify `GITHUB_REDIRECT_URI` in backend `.env`
- Update GitHub OAuth app callback URL
- Must match exactly: `https://flowdeploy.cloud/auth/github/callback`

### WebSocket Connection Failed

- Check if Socket.io server is running
- Verify JWT token is valid
- Check browser console for errors
- Ensure no firewall blocking WebSocket

### Deployment Errors

- Run `npm run build` to check for build errors
- Check TypeScript errors: `npm run type-check`
- Verify all environment variables are set
- Check browser console for runtime errors

## 🔒 Security Best Practices

1. **Never commit `.env` file** - Use `.env.example` template
2. **Use HTTPS in production** - Enable SSL certificates
3. **Validate user input** - Use Zod schemas
4. **Sanitize API responses** - Check data before rendering
5. **Implement CSP headers** - Content Security Policy
6. **Regular security audits** - `npm audit` and fix vulnerabilities
7. **Rate limiting** - Backend handles rate limiting

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT

## 👨‍💻 Author

**monu564100**

## 🌟 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

For issues and questions:
- Open a GitHub issue
- Check API_EXAMPLES.md for API usage
- Review TROUBLESHOOTING.md for common problems

---

**Made with ❤️ by monu564100**
