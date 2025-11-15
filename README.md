# Snipp - Turn Code into Beautiful Images

A minimalist, modern web application for creating stunning screenshots of code, images, and websites. Perfect for documentation, social media, and presentations.

![Snipp](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Code Screenshots
- **Syntax Highlighting**: Support for multiple programming languages (JavaScript, TypeScript, Python, CSS, HTML, and more)
- **Custom Themes**: Choose from 10+ beautiful code themes (Monokai, Dracula, GitHub, Night Owl, and more)
- **Flexible Styling**: Customize background gradients, padding, rounded corners, and window controls
- **Line Numbers**: Optional line number display for better code readability

### 🖼️ Image Editor
- **Upload & Customize**: Upload images and apply custom backgrounds
- **Animation Support**: Add smooth animations to your images (fade, slide, scale, rotate, 3D transforms, and more)
- **Animation Timeline**: Visual timeline editor for precise animation control
- **Video Export**: Export animated images as smooth video files

### 🌐 Website Screenshots
- **URL Capture**: Capture screenshots of any website by URL
- **High Quality**: Full-page screenshots at 1920x1080 resolution
- **Puppeteer Integration**: Powered by Puppeteer for reliable screenshot capture

### 🎭 Additional Features
- **Dark Mode**: Full dark mode support with system preference detection
- **Minimalist UI**: Clean, user-friendly interface
- **Export Options**: Export as PNG images or WebM videos
- **Clipboard Support**: Copy images directly to clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd code
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
code/
├── app/
│   ├── api/
│   │   └── screenshot/          # Puppeteer screenshot API endpoint
│   ├── editor/                   # Main editor page
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # Reusable UI components (shadcn/ui)
│   ├── animation-timeline.tsx   # Animation timeline editor
│   ├── control-panel.tsx        # Editor control panel
│   ├── image-preview.tsx         # Image preview with animations
│   ├── mode-toggle.tsx           # Dark/light mode toggle
│   └── preview-window.tsx        # Code preview window
├── lib/
│   ├── animation-calculator.ts   # Animation style calculations
│   ├── color-utils.ts            # Color conversion utilities
│   ├── utils.ts                  # General utilities
│   └── video-export.ts           # Video export functionality
├── types/
│   └── animation.ts              # TypeScript types for animations
└── public/                        # Static assets
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Code Highlighting**: [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)
- **Screenshots**: 
  - [html2canvas-pro](https://www.npmjs.com/package/html2canvas-pro) - DOM to canvas conversion
  - [Puppeteer](https://pptr.dev/) - Website screenshot capture
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Video Encoding**: MediaRecorder API - Browser-native video encoding

## 📖 Usage

### Code Screenshots

1. Navigate to the editor (`/editor`)
2. Select the **Code** tab
3. Enter or paste your code
4. Choose your preferred language and theme
5. Customize background, padding, and other settings
6. Click **Export as Image** or **Copy to Clipboard**

### Image Animations

1. Select the **Image** tab
2. Upload an image
3. Add animations using the timeline editor
4. Preview the animation
5. Export as **Video** or **Image**

### Website Screenshots

1. Select the **URL** tab
2. Enter a website URL
3. Click **Capture Screenshot**
4. The screenshot will appear in the preview
5. Export or copy as needed

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. However, for production deployments:

- Ensure Puppeteer dependencies are available (see Deployment section)
- Configure CORS if needed for API endpoints

### Customization

- **Themes**: Modify themes in `components/preview-window.tsx`
- **Animations**: Add new animation types in `lib/animation-calculator.ts`
- **Styling**: Customize Tailwind theme in `app/globals.css`

## 🚢 Deployment

### Vercel (Recommended)

The project is fully configured for Vercel deployment with Puppeteer support using `@sparticuz/chromium`.

#### Quick Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Click "Deploy"

3. **That's it!** Your app will be live in minutes.

#### Configuration

The project includes:
- ✅ `vercel.json` - Configured for serverless functions with 30s timeout
- ✅ `@sparticuz/chromium` - Vercel-compatible Chromium for Puppeteer
- ✅ `puppeteer-core` - Lightweight Puppeteer without bundled Chromium
- ✅ Next.js config optimized for Vercel

#### Vercel-Specific Features

- **Serverless Functions**: Screenshot API runs as a serverless function
- **Automatic Scaling**: Handles traffic spikes automatically
- **Edge Network**: Global CDN for fast content delivery
- **Environment Variables**: Set via Vercel dashboard if needed

#### Important Notes

- The screenshot API has a 30-second timeout (configured in `vercel.json`)
- First request may be slower due to cold start (~2-3 seconds)
- Subsequent requests are much faster
- Free tier includes 100GB bandwidth and 100 hours of serverless function execution

### Self-Hosted

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

3. **Puppeteer Requirements**
   - Ensure Chrome/Chromium is installed on the server
   - Install required system dependencies:
     ```bash
     # Ubuntu/Debian
     sudo apt-get install -y \
       ca-certificates \
       fonts-liberation \
       libappindicator3-1 \
       libasound2 \
       libatk-bridge2.0-0 \
       libatk1.0-0 \
       libc6 \
       libcairo2 \
       libcups2 \
       libdbus-1-3 \
       libexpat1 \
       libfontconfig1 \
       libgbm1 \
       libgcc1 \
       libglib2.0-0 \
       libgtk-3-0 \
       libnspr4 \
       libnss3 \
       libpango-1.0-0 \
       libpangocairo-1.0-0 \
       libstdc++6 \
       libx11-6 \
       libx11-xcb1 \
       libxcb1 \
       libxcomposite1 \
       libxcursor1 \
       libxdamage1 \
       libxext6 \
       libxfixes3 \
       libxi6 \
       libxrandr2 \
       libxrender1 \
       libxss1 \
       libxtst6 \
       lsb-release \
       wget \
       xdg-utils
     ```

### Docker (Alternative)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

# Install Puppeteer dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

## 🐛 Troubleshooting

### Puppeteer Issues

If you encounter Puppeteer errors:

1. **Missing dependencies**: Install system dependencies (see Deployment section)
2. **Permission errors**: Ensure proper permissions for Chrome/Chromium
3. **Memory issues**: Increase Node.js memory limit: `NODE_OPTIONS=--max-old-space-size=4096`

### Video Export Issues

- **Animation not smooth**: Ensure sufficient system resources
- **Export fails**: Check browser console for errors
- **Large file sizes**: Reduce video duration or frame rate

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS approach

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ using Next.js and TypeScript

