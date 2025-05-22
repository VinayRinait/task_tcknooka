# Admission Portal

A modern, responsive web application for managing university admissions, built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Analytics Dashboard**
  - Real-time admission statistics
  - Application trends visualization
  - Program-wise application distribution
  - Comparison with previous periods

- 👥 **Applicant Management**
  - Comprehensive applicant list with pagination
  - Advanced search and filtering
  - Status management (Pending, Verified, Rejected)
  - Sortable columns
  - Responsive table design

- 📱 **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Collapsible sidebar for mobile devices
  - Touch-friendly interface

- 🔔 **Notification System**
  - Real-time notifications
  - Notice board
  - Upcoming events calendar

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Heroicons
- **Routing:** React Router
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/admission-portal.git
   cd admission-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

### Deploying to Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. Deploy using one of these methods:

   **Method 1: Using Vercel Dashboard (Recommended)**
   1. Push your code to GitHub
   2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
   3. Click "New Project"
   4. Import your GitHub repository
   5. Configure project settings:
      - Framework Preset: Vite
      - Build Command: `npm run build`
      - Output Directory: `dist`
   6. Click "Deploy"

   **Method 2: Using Vercel CLI**
   ```bash
   vercel
   ```

3. Environment Variables (if needed):
   - Add any required environment variables in the Vercel dashboard
   - Project Settings > Environment Variables

4. Automatic Deployments:
   - Vercel automatically deploys when you push to your main branch
   - Preview deployments are created for pull requests

## Project Structure

```
src/
├── components/         # React components
├── data/              # Mock data and types
├── services/          # API services
└── App.tsx           # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Heroicons](https://heroicons.com/)
