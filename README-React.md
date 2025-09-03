# Oaxaca Brunch Website - React Version

A modern, responsive website for Oaxaca Brunch restaurant built with React, Vite, and Framer Motion.

## 🚀 Features

- **Smooth Infinite Scrolling Banner**: Built with Framer Motion for seamless animation
- **Responsive Design**: Mobile-first approach with smooth animations
- **Modern React Architecture**: Component-based structure for maintainability
- **Performance Optimized**: Built with Vite for fast development and optimized builds
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **CSS3** - Modern CSS with custom properties
- **ESLint** - Code linting and formatting

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Hero section with video player
│   ├── ScrollingBanner.jsx   # Smooth infinite scrolling banner
│   ├── Navbar.jsx           # Navigation component
│   ├── MenuTeaser.jsx       # Menu preview section
│   ├── Story.jsx            # About section
│   ├── Gallery.jsx          # Image gallery
│   ├── Reviews.jsx          # Customer reviews
│   ├── Visit.jsx            # Location and hours
│   └── Footer.jsx           # Footer component
├── App.jsx                  # Main app component
├── main.jsx                 # React entry point
└── index.css               # Global styles
```

## 🎨 Key Components

### ScrollingBanner
The star component that provides smooth, seamless infinite scrolling:
- Uses Framer Motion for smooth animations
- Automatically calculates content width for perfect loops
- Responsive and performant
- Easy to customize with different items

### Hero Section
- Animated content with staggered reveals
- Video player with custom controls
- Smooth scrolling banner integration

## 🔧 Customization

### Banner Items
Update the banner content in `src/components/Hero.jsx`:

```jsx
const bannerItems = [
  '☕ Café de Especialidad',
  '🥐 Brunch Artesanal',
  '🌱 Ingredientes Frescos',
  '👨‍🍳 Recetas Familiares',
  '🏺 Tradición Oaxaqueña'
]
```

### Animation Speed
Adjust the banner speed in `src/components/ScrollingBanner.jsx`:

```jsx
duration: 20, // Seconds for one complete loop
```

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
