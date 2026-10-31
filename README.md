<div align="center">

# ✦ Abhijeet Kumar Das

<h3 align="center">
  <span style="color: #3C91F6;"><font color="#3C91F6"><img src="./public/ai-genai-engineer.svg" alt="AI &amp; GenAI Engineer" height="30" /></font></span>
</h3>


An interactive, high-performance developer portfolio built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Engineered with smooth inertia scrolling, interactive vector line art, a custom hand-drawn canvas preloader, credential verification modals, and complete technical SEO optimization.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge)](https://lenis.darkroom.engineering/)

[LinkedIn](https://www.linkedin.com/in/abhijeet-kumar-das-0b4501324) • [GitHub](https://github.com/abhijeetkumardas24-bit)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Sections Breakdown](#-sections-breakdown)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [SEO & Web Indexing](#-seo--web-indexing)
- [Performance & Accessibility](#-performance--accessibility)
- [Author & Connect](#-author--connect)

---

## 🌟 Overview

This portfolio serves as the central digital showcase for **Abhijeet Kumar Das**, presenting real-world engineering work across **Artificial Intelligence**, **Generative AI**, **RAG pipelines**, **Agentic Systems**, and **Backend Infrastructure**.

The site is designed with a dark technical aesthetic (`#080B10` void theme with warm champagne `#D9C6AA` line art and `#3C91F6` electric accents). Every interaction prioritizes hardware-accelerated animations (`transform` and `opacity` only) to achieve fluid 60+ FPS performance on mobile and desktop.

---

## ✨ Key Features

- **Fluid Organic Preloader**:
  - Typewriter sequence for `"WELCOME DEVS"` with a pulsing accent cursor dot.
  - Hand-drawn SVG stroke animation (`pathLength` / `stroke-dashoffset`) looping organically around the text.
  - Multi-layered dark fluid contours with floating champagne ribbons and twinkling constellation particles.
  - Instant scroll unlock on reveal, keyboard skip (`Escape`), and `prefers-reduced-motion` detection.
- **Interactive Spotlight Dot Grid**:
  - High-performance canvas-based dynamic spotlight grid that responds in real-time to mouse tracking and touch coordinates.
- **Academic & Verification Technical Line-Art**:
  - Custom SVG blueprint graphics (orbital arcs, diploma borders, circuit paths, code windows, and golden sparkle stars) embedded seamlessly into section backgrounds.
- **Credential Card Stack & Lightbox Preview**:
  - 3D interactive stacked card carousel with spring physics (`Framer Motion`).
  - Full-screen high-resolution modal preview with in-modal keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`) and direct verification links to Credly & Oracle University.
- **Projects Carousel**:
  - Horizontal drag & snap carousel showcasing featured AI & NLP applications, tags, live deployment links, and GitHub repositories.
- **Lenis Inertia Smooth Scroll**:
  - Seamless wheel and touch momentum scrolling coordinated directly with component lifecycle transitions.
- **Enterprise-Grade Technical SEO**:
  - Schema.org JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`), complete OpenGraph metadata, Twitter Cards, XML Sitemap, and semantic `<noscript>` fallback for zero-JS crawlers.

---

## 📑 Sections Breakdown

| Section | Description |
| :--- | :--- |
| **Intro Preloader** | Fluid full-screen welcome sequence featuring organic SVG ribbons, typing animation, and exit zoom. |
| **Navbar** | Glassmorphic floating header with scroll detection, dynamic blur, and responsive mobile overlay menu. |
| **Hero** | Personal identity eyebrow, bold multi-line typography, spotlight dot grid, and quick action CTAs. |
| **About** | Academic background, interest in Generative AI systems, and a scroll-linked grayscale-to-color portrait. |
| **Skills** | Blueprint-backed technical skills breakdown across Languages, Frameworks, Backend, and Data Tooling. |
| **Certificates** | Interactive 3D stacked credential deck with verified badges and high-res lightbox modals. |
| **Projects** | Curated catalog of production-grade AI applications with architecture tags, demos, and code repositories. |
| **Contact** | Clean direct touchpoint section connecting to verified LinkedIn and GitHub profiles. |

---

## 🛠 Tech Stack

### Core Framework & Runtime
- **[React 19](https://react.dev/)**: Latest concurrent rendering and state primitives.
- **[TypeScript](https://www.typescriptlang.org/)**: Full strict-mode type safety across all components and data structures.
- **[Vite 8](https://vitejs.dev/)**: Next-generation frontend build tooling with instantaneous HMR.

### Styling & Animation
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Modern CSS tokens, utility layers, and lightning-fast build pipeline.
- **[Framer Motion 14](https://www.framer.com/motion/)**: Spring physics, layout animations, exit transitions, and SVG path drawing.
- **[Lenis](https://lenis.darkroom.engineering/)**: Smooth inertia scrolling across all viewports.
- **[Lucide React](https://lucide.dev/)**: Clean, scalable SVG icons.

### Tooling & Quality
- **[Oxlint](https://oxc.rs/)**: High-performance Rust-based linter ensuring clean code hygiene.
- **PostCSS**: Automated vendor prefixing and CSS processing.

---

## 📁 Project Architecture

```
PORTFOLIO/
├── public/
│   ├── certificates/          # High-resolution verified credential images (2376x1836)
│   │   ├── aws-ml-cert.png
│   │   ├── aws-nlp-cert.png
│   │   └── oracle-cert.png
│   ├── favicon.svg            # Site vector favicon
│   ├── profile.png            # Portrait photograph (768x1024)
│   ├── robots.txt             # Search engine crawler instructions
│   └── sitemap.xml            # Production XML sitemap
├── src/
│   ├── components/            # React UI components
│   │   ├── About.tsx          # Personal biography & interactive portrait
│   │   ├── Certificates.tsx   # 3D Stacked credentials & lightbox modal
│   │   ├── Contact.tsx        # Social contact buttons & footer signature
│   │   ├── Hero.tsx           # Main heading & interactive spotlight grid
│   │   ├── IntroPreloader.tsx # Fullscreen wavy ribbon & typing intro
│   │   ├── Navbar.tsx         # Floating glassmorphic navigation bar
│   │   ├── Projects.tsx       # Horizontal snap-scroll projects gallery
│   │   ├── Skills.tsx         # Blueprint technical competencies matrix
│   │   └── SpotlightDotGrid.tsx # Real-time mouse tracking canvas dot matrix
│   ├── data/
│   │   └── projects.ts        # Structured project catalog data
│   ├── utils/
│   │   └── intro.ts           # Preloader lifecycle & reduced-motion checks
│   ├── App.tsx                # App root, Lenis initialization & scroll management
│   ├── index.css              # Design system CSS tokens & Tailwind theme definitions
│   └── main.tsx               # DOM mount entrypoint
├── index.html                 # Semantic HTML, OpenGraph, Twitter Cards & JSON-LD Schema
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build & plugin settings
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm** or **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhijeetkumardas24-bit/PORTFOLIO.git
   cd PORTFOLIO
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with HMR. |
| `npm run build` | Runs TypeScript type checking (`tsc -b`) and builds production bundles in `/dist`. |
| `npm run preview` | Locally serves the production build for testing. |
| `npm run lint` | Runs ultra-fast Rust-based Oxlint across all TypeScript and JSX files. |

---

## 🔍 SEO & Web Indexing

The portfolio includes an end-to-end technical SEO configuration designed to establish personal identity indexing on Google for **"Abhijeet Kumar Das"**:

1. **Schema.org Structured Data (JSON-LD)**:
   - Linked `@graph` featuring `Person`, `WebSite`, and `ProfilePage`.
   - Verified educational institution, technical skill ontology, and external profile URLs (`sameAs` LinkedIn & GitHub).
2. **Search Directives**:
   - `robots.txt` allowing crawler indexation with direct sitemap linkage.
   - `sitemap.xml` declaring canonical URLs, priority, and update frequencies.
   - Self-referencing canonical tags to prevent duplicate indexing issues.
3. **Open Graph & Twitter Cards**:
   - High-resolution `768x1024` profile image preview, customized titles, and descriptive card tags for LinkedIn, Twitter/X, and messaging previews.
4. **Zero-JS Fallback (`<noscript>`)**:
   - Pure semantic HTML snapshot included directly in `index.html` guaranteeing that search engine bots and text parsers index the complete biographical and project data immediately without waiting on client JavaScript execution.

---

## ⚡ Performance & Accessibility

- **Compositor-Only Animations**: All transition sequences animate exclusively through GPU-accelerated CSS `transform` and `opacity` properties.
- **Zero Layout Shifts (CLS 0.0)**: All image elements declare explicit aspect-ratio and width/height dimensions (`profile.png` 768×1024, certificates 800×530).
- **Reduced Motion Support**: Automatically disables the introductory preloader for users with `prefers-reduced-motion: reduce` enabled in system accessibility settings.
- **Keyboard Navigable**: Modal views and the preloader support global keyboard shortcuts (`Escape` to close/skip, `ArrowLeft` / `ArrowRight` to cycle credentials).

---

## 📬 Author & Connect

**Abhijeet Kumar Das**  
*Computer Science Undergraduate • AI & GenAI Engineer*

- **LinkedIn**: [linkedin.com/in/abhijeet-kumar-das-0b4501324](https://www.linkedin.com/in/abhijeet-kumar-das-0b4501324)
- **GitHub**: [github.com/abhijeetkumardas24-bit](https://github.com/abhijeetkumardas24-bit)

---

<div align="center">
  <sub>Designed & Developed by Abhijeet Kumar Das • 2026</sub>
</div>
