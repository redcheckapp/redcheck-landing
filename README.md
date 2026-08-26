# RedCheck - Official Landing Page

![Astro](https://img.shields.io/badge/Astro-0C0E14?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **RedCheck** is an interactive time and task management application designed to prioritize daily workloads using artificial intelligence. 

This repository contains the static **Landing Page** designed to showcase the features of the RedCheck platform. You can find the main Frontend web application and the Backend API architecture in their respective repositories.

This project showcases a strong focus on web performance, SEO optimization, and frictionless user experience.

<p align="center">
  <img src="[INSERT_HERO_IMAGE_URL_HERE]" alt="RedCheck Landing Page Overview" width="800"/>
</p>

## Key Features

The landing page was engineered to be exceptionally fast and highly interactive without relying on heavy client-side JavaScript bundles.

- **Performance-First Architecture:** Built with Astro to deliver a static site with near-zero JavaScript payload by default, ensuring optimal load times and top-tier SEO metrics.
- **Native Internationalization (i18n):** Seamless English and Spanish language switching utilizing a lightweight, pure CSS architecture, eliminating the need for complex routing or state management.
- **Interactive AI Showcase:** Custom vanilla JavaScript DOM animations that visually simulate the RedCheck AI algorithm. It demonstrates the transition from user chaos to optimized order without requiring a backend connection.

  <p align="center">
    <img src="[INSERT_AI_ANIMATION_GIF_URL_HERE]" alt="SmartCheck AI Interactive Demo" width="800"/>
  </p>
  
- **Native Dark Mode:** Fully integrated Light and Dark themes supported by CSS variables and local storage, adapting flawlessly to system preferences and preventing layout shifts.
  
  <p align="center">
    <img src="[INSERT_DARK_MODE_TRANSITION_GIF_URL_HERE]" alt="Dark Mode Transition" width="800"/>
  </p>
  
- **Responsive Layouts:** Fluid, mobile-first design built strictly with Tailwind CSS utility classes to ensure a perfect presentation across all device sizes.

## Tech Stack

- **Core Framework:** Astro.
- **Styling:** Tailwind CSS.
- **Iconography:** Lucide React.
- **Interactivity:** Vanilla JavaScript (custom scripts for animations and language context).

## Local Installation & Deployment

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone [https://github.com/redcheckapp/redcheck-landing.git](https://github.com/redcheckapp/redcheck-landing.git)
   cd redcheck-landing
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:4321` in your web browser.
5. To build the project for production, `run npm run build`. The optimized static files will be generated in the `dist/` directory, ready to be deployed to any static hosting provider.
