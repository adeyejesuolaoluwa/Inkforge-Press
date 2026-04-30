# InkInkForge Press - Modern Publishing Website

A premium, fully responsive website for a professional book publishing and author services platform.

## 📋 Features Implemented

### 🎨 Design & Theme
- ✅ **Dark/Light Mode Toggle** - Professional theme switching with persistent local storage
- ✅ **Premium Dark Theme** - Deep black (#0f0f0f) with gold (#d4af37) accents (default)
- ✅ **Elegant Light Theme** - Soft white backgrounds with dark text and gold highlights
- ✅ **Smooth Transitions** - All theme changes animate smoothly
- ✅ **Professional Typography** - Multiple font families:
  - `Playfair Display` for elegant headings
  - `Cormorant Garamond` for serif elegance
  - `Inter` for clean, modern body text

### 🧭 Website Sections

1. **Navigation Bar**
   - Fixed sticky navigation with blur effect
   - Active link indicators with animated underlines
   - Mobile-responsive hamburger menu
   - Scroll-triggered styling changes
   - Dark/light theme toggle button

2. **Hero Section**
   - Bold, gradient headline
   - Compelling subtext
   - Dual CTA buttons (Get Started, View Services)
   - Animated floating elements background
   - Parallax scroll effect

3. **Services Section**
   - 6 service cards with icons:
     - Book Editing
     - Book Formatting
     - Book Publishing
     - Book Marketing
     - Book Review & Visibility
     - Author Consultation
   - Hover animations with color changes
   - Icon-based visual hierarchy

4. **About Section**
   - Company story and mission
   - Key statistics with counter animations
   - Professional image placeholder with animation
   - Responsive two-column layout

5. **Portfolio / Work Showcase**
   - 6 featured book covers with gradient placeholders
   - Book titles, authors, and genres
   - Hover effects with brightness changes
   - Responsive grid layout

6. **Testimonials Section**
   - 5 professional client reviews
   - 5-star ratings
   - Avatar badges with initials
   - Author names and book titles
   - Card hover animations

7. **Pricing Section**
   - 3 pricing tiers (Starter, Professional, Premium)
   - Feature comparisons with icons
   - "Most Popular" badge on Professional plan
   - Scale transform on featured card
   - Transparent pricing model

8. **Contact Section**
   - Professional contact form with validation
   - Service selection dropdown
   - Multiple input types (text, email, tel, textarea)
   - Contact information with icons
   - Social media links
   - Form submission handling with notifications

9. **Footer**
   - Multi-column layout
   - Quick navigation links
   - Newsletter subscription form
   - Social media links
   - Copyright and legal links

10. **Scroll to Top Button**
    - Appears after 300px scroll
    - Smooth animation
    - Smooth scroll behavior

### ✨ Interactive Features

- **Mobile Menu** - Hamburger menu with smooth animations
- **Smooth Scrolling** - Native smooth scroll for all navigation links
- **Form Validation** - Real-time contact form validation
- **Notifications** - Success/error toast messages
- **Intersection Observer** - Fade-in animations as elements appear
- **Counter Animation** - Animated number counters in about section
- **Button Ripple Effects** - Click ripple animations on buttons
- **Parallax Scrolling** - Background elements move with scroll
- **Active Link Tracking** - Navigation links highlight based on scroll position
- **Cursor Effects** - Custom cursor animation on hover

### 📱 Responsive Design

- **Mobile First** - Optimized for all screen sizes
- **Breakpoints**:
  - Desktop: Full layout with all features
  - Tablet (≤768px): Adjusted spacing, single-column layouts where needed
  - Mobile (≤480px): Stack layouts, larger touch targets, optimized typography
- **Flexible Images** - All images scale responsively
- **Touch-Friendly** - Larger buttons and spacing for touch devices
- **Performance** - Optimized for faster loading

### ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- `prefers-reduced-motion` support
- Form labels properly associated with inputs
- Skip link considerations

### 🎯 Performance Features

- CSS custom properties for theming
- Minimal JavaScript for smooth animations
- RequestAnimationFrame for smooth animations
- Lazy loading considerations
- Optimized assets
- No external dependencies except Font Awesome icons and Google Fonts

## 📁 File Structure

```
InkInkForge/
├── index.html      # Main HTML file with all sections
├── styles.css      # Complete styling with themes and animations
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## 🚀 Getting Started

1. **Open the website**:
   - Double-click `index.html` or open it in a web browser

2. **Toggle Theme**:
   - Click the moon/sun icon in the top-right corner
   - Theme preference is saved in browser localStorage

3. **Navigate**:
   - Use the navigation bar to jump to sections
   - Scroll smoothly with automatic active link highlighting

4. **Contact**:
   - Fill out the contact form with your information
   - Submit to receive a success notification

5. **Subscribe**:
   - Enter your email in the footer newsletter form

## 🎨 Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --accent-primary: #d4af37;      /* Gold accent */
    --accent-secondary: #e8d7c3;    /* Light gold */
    --text-primary: #ffffff;        /* Text color */
    --bg-primary: #0f0f0f;          /* Background */
    /* ... more variables */
}
```

### Change Fonts
Google Fonts are imported in `index.html`. Update the import URL or replace font families in CSS.

### Add More Services
Duplicate a `.service-card` div and update:
- Icon class (Font Awesome)
- Title
- Description
- Link href

### Update Pricing
Edit the `.pricing-card` sections with:
- Plan name
- Price amount
- Feature list
- Button text

### Customize Content
All text is easily editable in `index.html`. Search for specific sections and update as needed.

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📚 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties, grid, flexbox
- **JavaScript (Vanilla)** - No frameworks, pure interactivity
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

## 💡 Features Highlights

1. **Dark Mode by Default** - Elegant dark theme with gold accents
2. **Professional Aesthetics** - Publishing-industry inspired design
3. **Smooth Animations** - Fade-ins, floats, and parallax effects
4. **Interactive Elements** - Hover effects, ripples, and transitions
5. **Form Handling** - Complete contact form with validation
6. **Mobile Responsive** - Perfect on all devices
7. **Performance Optimized** - Fast loading and smooth scrolling
8. **Accessibility** - WCAG compliance considerations

## 📞 Contact Information (Demo)

- **Email**: hello@inkinkorgepress.com
- **Phone**: (212) 555-1234
- **Address**: 123 Publishing Lane, New York, NY 10001

## 📝 License

This website template is created for InkInkForge Press. Feel free to customize and use for your publishing business.

---

**Created**: April 2026
**Last Updated**: April 30, 2026

Enjoy your premium publishing website! 📚✨
