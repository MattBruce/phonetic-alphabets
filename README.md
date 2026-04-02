# Phonetic Alphabets

A playful, interactive web application that converts text into various themed phonetic alphabets. From the standard NATO phonetic alphabet to corporate jargon and confusing "cursed" words, this tool makes spelling things out more entertaining.

## 🌟 Features

- **Themed Alphabets**: Switch between five distinct modes:
  - **Standard**: The classic NATO phonetic alphabet (Alpha, Bravo, Charlie...).
  - **Hipster ☕**: Trendy foods and lifestyle items (Açai, Brioche, Chia...).
  - **Business 💼**: Corporate buzzwords and jargon (Actionable, Blue Sky, Synergy...).
  - **Insta 💖**: Social media and influencer terminology (Authentic-self, Boho, Curated...).
  - **Cursed 👹**: Words with silent or confusing leading letters (Aisle, Bdellium, Pterodactyl...).
- **Real-time Conversion**: See your text transformed into the selected phonetic alphabet as you type.
- **Interactive UI**: Click on any phonetic word in the grid to add its letter to your input.
- **Dynamic Animations**: Smooth transitions and "bounce" effects when typing or switching modes.
- **Deep Linking**: Share specific configurations using URL parameters.
- **Responsive Design**: Optimized for various screen sizes using modern CSS techniques.

## 🚀 Getting Started

Simply open `index.html` in any modern web browser. No build steps or dependencies are required.

## 🔗 URL Parameters

You can pre-configure the application using the following URL parameters:

- `mode`: Set the initial alphabet mode (`standard`, `hipster`, `business`, `insta`, or `cursed`).
- `text`: Pre-fill the input field with a specific string.

**Example**: `index.html?mode=hipster&text=hello`

## 🛠️ Technology Stack

- **HTML5**: Semantic structure.
- **CSS3**: Advanced layouts (Grid, Flexbox), custom properties, and animations.
- **JavaScript (ES6+)**: Vanilla JS for logic, DOM manipulation, and state management.
- **Google Fonts**: Custom typography for each mode (`SUSE`, `Tilt Neon`, `Glass Antiqua`, `Flavors`, `Dancing Script`).

## 📁 Project Structure

- `index.html`: The main entry point and structure.
- `index.css`: Styles, animations, and mode-specific themes.
- `index.js`: Phonetic data, conversion logic, and UI interactions.
- `README.md`: Project documentation.
