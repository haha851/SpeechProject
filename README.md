# Arthur Iverson Speech Writing Service

A beautiful, responsive website for a professional speech writing service built with Next.js, Framer Motion, and Tailwind CSS. Inspired by the design and animations of hellocopilot.com.

## Features

- ✨ Smooth animations and transitions with Framer Motion
- 🎨 Beautiful cosmic-inspired design with gradient backgrounds
- 📱 Fully responsive for all device sizes
- 🔄 Simulated loading animation on page load
- 🌟 Interactive pricing cards and FAQ sections
- ⏱️ Dynamic countdown timer for sales urgency
- 📊 Google Analytics integration

## Getting Started

### Prerequisites

- Node.js 16.8+ and npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate the required images:
   - Use your OpenAI API key (stored in `.env`) to generate the images for:
     - `public/images/speaker-silhouette.png` (see placeholder text file for prompt)
     - `public/images/testimonial-1.jpg` (see placeholder text file for prompt)
     - `public/images/testimonial-2.jpg` (see placeholder text file for prompt)
     - `public/images/testimonial-3.jpg` (see placeholder text file for prompt)
   
   - You can use the OpenAI API directly or a tool like DALL-E 3 to generate these images

3. Replace the placeholder font:
   - Replace `public/fonts/Aeonik.otf` with the actual Aeonik font or a similar alternative

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Building for Production

```bash
npm run build
```

## Deployment to Vercel

1. Push the repository to GitHub (as specified in your instructions)
2. Link the GitHub repository to Vercel
3. Set up environment variables in Vercel:
   - `OPENAI_API_KEY` (for any server-side image generation)
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS` (G-NHP0V7DMK4)

4. Deploy your site

## Important Notes

- The API key is stored in `.env` which is included in the `.gitignore` file to prevent it from being exposed when pushing to GitHub
- You need to manually set up the environment variables in Vercel for deployment
- Google Analytics is already integrated with the tracking ID G-NHP0V7DMK4

## Project Structure

```
- app/                     # Next.js app directory
  - page.jsx               # Main homepage component
  - layout.jsx             # Layout with metadata and analytics
  - globals.css            # Global styles
- components/              # React components
  - Header.jsx             # Navigation header
  - HeroSection.jsx        # Hero section with main CTA
  - FeaturesSection.jsx    # "What You Get" section
  - ProcessSection.jsx     # "How It Works" section
  - PricingSection.jsx     # Plans and pricing section
  - TestimonialsSection.jsx # Client testimonials
  - FaqSection.jsx         # Frequently asked questions
  - CallToAction.jsx       # Final CTA with countdown
  - Footer.jsx             # Footer with links and contact
- public/                  # Static assets
  - images/                # All website images
  - fonts/                 # Custom fonts
- utils/                   # Utility functions
  - analytics.js           # Google Analytics implementation