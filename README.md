# Project Name: **Insweave Clone**

## Overview

This is a clone of the Insweave website, a modern digital infrastructure service provider, built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. The project features a **dark mode** theme, smooth animations, and modern UI elements. The app mimics the design of Insweave, with sections like **Hero**, **Services**, **Portfolio**, **Process**, **Mission**, and **Contact**. The primary goal is to provide a sleek, professional user experience using modern web technologies.

---

## Features

* **Dark Theme**: The entire site is optimized for dark mode with smooth background gradients and subtle animations.
* **Responsive Design**: Fully responsive layout using **Tailwind CSS**, ensuring a great experience on all devices.
* **Custom Font**: Uses the **Inter** font for a clean, modern look.
* **Smooth Scrolling**: Smooth scroll effect for better navigation between sections.
* **Reusable Components**: Cleanly separated components for better scalability and maintainability.

---

## Tech Stack

* **React** (Frontend Framework)
* **Vite** (Build Tool)
* **TypeScript** (Strongly Typed JavaScript)
* **Tailwind CSS** (Utility-first CSS Framework)
* **Inter** (Font)
* **React Router** (For internal routing)

---

## Installation

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/insweave-clone.git
```

### 2. Install Dependencies

Navigate into the project folder and install the required dependencies:

```bash
cd insweave-clone
npm install
```

### 3. Run the Development Server

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to see the app running locally.

---

## Project Structure

```
/insweave-clone
|-- /public
|   |-- index.html            # Main HTML file
|   |-- /assets               # Images, logos, icons
|-- /src
|   |-- /components           # Reusable UI components
|   |   |-- Hero.tsx          # Hero Section Component
|   |   |-- Services.tsx      # Services Section Component
|   |   |-- Portfolio.tsx     # Portfolio Section Component
|   |   |-- Footer.tsx        # Footer Component
|   |   |-- Contact.tsx       # Contact Section Component
|   |-- App.tsx               # Main App Component
|   |-- index.tsx             # Entry Point for React
|   |-- /styles               # Global Styles (Tailwind CSS config)
|   |   |-- index.css         # Global styles (font, background)
|   |-- /utils                # Utility functions and helpers
|-- package.json             # Project metadata and dependencies
|-- tailwind.config.js       # Tailwind configuration
|-- postcss.config.js        # PostCSS configuration
|-- tsconfig.json            # TypeScript configuration
|-- README.md                # Project documentation
```

---

## Tailwind Setup

Tailwind is used for utility-based styling. It is configured with the `tailwind.config.js` file. If you'd like to add new utilities or change default configurations, update this file accordingly.

```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Customizations

### 1. **Fonts**

The project uses **Inter** as the custom font, which is loaded from Google Fonts. You can adjust the font weights in the **`index.html`** file.

### 2. **Dark Theme**

The website is designed with a **dark theme**. If you want to adjust the dark mode styling, modify the background gradients, text colors, or use the **`bg-slate-*`** and **`text-slate-*`** classes in the Tailwind setup.

### 3. **Responsive Design**

The layout is fully responsive. The Tailwind classes make the app look great across all devices — from phones to large desktop screens.

### 4. **Smooth Scrolling**

Smooth scrolling between sections is enabled for a seamless navigation experience. The page transitions from **Hero**, **Services**, **Portfolio**, etc., are smooth and responsive.

---

## Known Issues

* **Performance**: On low-end devices, some sections with animations or blurred backgrounds may experience performance drops.
* **Browser Compatibility**: This app works best on modern browsers like Chrome, Firefox, and Safari. Older browsers may experience layout inconsistencies.

---

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and create a pull request. Please ensure your changes follow the project's coding standards and include appropriate tests.

### Steps to Contribute:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch: `git checkout -b feature-branch`
4. Make your changes and commit them.
5. Push to your fork: `git push origin feature-branch`
6. Open a pull request.

---

## License

This project is licensed under the **MIT License**.


### That’s it! 🚀

Once you integrate this into your project folder, you’ll have a clean **README.md** ready to go. You can always modify and expand based on any future updates or new sections in your project.
