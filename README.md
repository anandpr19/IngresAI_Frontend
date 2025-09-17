# INGRES AI — Groundwater Intelligence

Revolutionary AI-powered platform that transforms India's groundwater data into natural conversations. Ask questions in Hindi or English, get instant insights from CGWB data and real-time monitoring stations.

## 🌊 Live Demo

Visit the live demo: [https://ingres-ai.lovable.app](https://ingres-ai.lovable.app)

## 🚀 Features

- **Conversational AI**: Chat with groundwater data in Hindi and English
- **Real-time Analytics**: Access live CGWB monitoring stations
- **Historical Analysis**: Decades of groundwater trend data
- **Predictive Modeling**: AI-powered forecasting for water table trends
- **Interactive Visualizations**: Sparklines, charts, and time-series analysis
- **Responsive Design**: Mobile-first approach with beautiful animations

## 🎨 Design System

### Colors
- **Deep Sea Blue**: `#0B5FA5` - Primary brand color
- **Teal Accent**: `#17B2A0` - Interactive elements and highlights
- **Sand Warm**: `#F4EAD5` - Light backgrounds and warm accents
- **Navy Dark**: `#0F1724` - Text and dark themes

### Typography
- **Headings**: Inter (Bold/Semibold) - Modern, clean sans-serif
- **Body**: Inter (Regular/Medium) - Excellent readability

### Spacing & Layout
- **Container**: Max-width 7xl (80rem) with responsive padding
- **Grid**: CSS Grid with 1-3 column layouts
- **Radius**: 0.75rem default for modern rounded corners

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Shadcn/ui with custom variants
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Animations**: CSS transitions and custom keyframes

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <your-git-url>
cd ingres-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🔧 Development

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn)
│   ├── Hero.tsx        # Landing page hero section
│   ├── Features.tsx    # Feature showcase cards
│   ├── DemoChat.tsx    # Interactive demo chat UI
│   ├── Analytics.tsx   # Data visualization section
│   └── Footer.tsx      # Site footer with links
├── pages/              # Page components
│   └── Index.tsx       # Main landing page
├── lib/                # Utilities and helpers
├── hooks/              # Custom React hooks
└── assets/             # Images and static files
```

### Key Components

1. **Hero Section** - Animated gradient background with floating elements
2. **Features Grid** - Three-card layout showcasing main capabilities
3. **Demo Chat** - Interactive chat UI with mock responses
4. **Analytics Dashboard** - Time-series slider and data visualizations
5. **Footer** - Comprehensive links and language switcher

### Design Guidelines

- Use semantic color tokens from the design system
- Implement hover effects with `hover-lift` class
- Follow mobile-first responsive design
- Maintain consistent spacing with Tailwind utilities
- Use Inter font family throughout

## 🌐 API Integration (Future)

The current implementation uses mock data for demonstration. For production deployment:

### Backend Endpoints (Placeholder)

```typescript
// Chat API
POST /api/chat
{
  "message": "What's the groundwater level in Delhi?",
  "language": "en" | "hi"
}

// Analytics API  
GET /api/analytics/trends?state=DL&year=2023

// Real-time Data
GET /api/monitoring/stations?district=New-Delhi
```

### Environment Variables

Create `.env.local` for API configuration:

```bash
# API Configuration
VITE_API_BASE_URL=https://api.ingres-ai.com
VITE_CGWB_API_KEY=your_cgwb_api_key
VITE_ANALYTICS_ENDPOINT=https://analytics.ingres-ai.com

# Feature Flags
VITE_ENABLE_VOICE_INPUT=true
VITE_ENABLE_HINDI_NLP=true
```

## 🚀 Deployment

### Lovable Platform (Recommended)

1. Visit [Lovable Project](https://lovable.dev/projects/252867eb-daa2-4c44-934f-0415c89a494e)
2. Click "Share" → "Publish"
3. Your app will be live at `your-app.lovable.app`

### Custom Domain

1. Go to Project Settings → Domains
2. Connect your custom domain
3. Configure DNS records as shown

### Other Platforms

**Vercel/Netlify:**
```bash
npm run build
# Deploy dist/ folder
```

**Docker:**
```dockerfile
FROM node:18-alpine
COPY . .
RUN npm ci && npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

## 📊 Analytics & Monitoring

- **Performance**: Built-in Vite optimizations
- **SEO**: Complete meta tags and structured data
- **Accessibility**: Semantic HTML and ARIA labels
- **Browser Support**: Modern browsers (ES2020+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for all new components
- Follow Tailwind CSS best practices
- Implement proper error boundaries
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CGWB** - Central Ground Water Board for data access
- **IIT Partnership** - Research collaboration and validation
- **Ministry of Jal Shakti** - Policy guidance and support
- **Open Source Community** - React, Tailwind, and UI component libraries

---

**Built with ❤️ for India's Water Security**

For support, email us at [contact@ingres-ai.com](mailto:contact@ingres-ai.com) or visit our [Help Center](#help).