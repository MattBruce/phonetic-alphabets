# Phonetic Alphabets

A playful, interactive web application that converts text into various themed phonetic alphabets. From the standard NATO phonetic alphabet to corporate jargon and confusing "cursed" words, this tool makes spelling things out more entertaining.

## 🌟 Features

- **Themed Alphabets**: Switch between six distinct modes:
  - **Standard**: The classic NATO phonetic alphabet (Alpha, Bravo, Charlie...).
  - **Hipster ☕**: Trendy foods and lifestyle items (Açai, Burrata, Chia...).
  - **Business 💼**: Corporate buzzwords and jargon (Actionable, Blue-sky, Synergy...).
  - **Insta 💖**: Social media and influencer terminology (Authentic-self, Boho, Curated...).
  - **Techbro 🚀**: Startup and VC terminology (AI-first, Blockchain, Disrupt...).
  - **Cursed 👹**: Words with silent or confusing leading letters (Aisle, Bdellium, Pterodactyl...).
- **Integrated Voice Synthesis**: Hear your phonetic conversions spoken aloud with custom voices and prosody for each mode.
- **Real-time Conversion**: See your text transformed into the selected phonetic alphabet as you type.
- **Interactive UI**: Click on any phonetic word in the grid to add its letter to your input.
- **Dynamic Animations**: Smooth transitions and "bounce" effects when typing or switching modes.
- **Deep Linking**: Share specific configurations using URL parameters.
- **Responsive Design**: Optimized for various screen sizes using modern CSS techniques (now with improved mobile layout).

## 🔊 Voice & Prosody

Each mode features unique speech patterns and voice selection to match its theme:

- **Standard**: Clear, neutral delivery with standard NATO timing.
- **Hipster ☕**: Laid-back, slightly higher-pitched voice with relaxed pacing.
- **Business 💼**: Professional, assertive tone with efficient, "synergistic" timing.
- **Insta 💖**: High-energy, "up-talk" delivery with rising intonation and sparkle-inspired pauses.
- **Techbro 🚀**: Fast-paced, disruptive delivery with a focus on "high-growth" verbal speed.
- **Cursed 👹**: Slow, unsettling delivery with deep pitch and glitched, unpredictable pauses.

## 🚀 Getting Started

Simply open `index.html` in any modern web browser. No build steps or dependencies are required.

## 🔗 URL Parameters

You can pre-configure the application using the following URL parameters:

- `mode`: Set the initial alphabet mode (`standard`, `hipster`, `business`, `insta`, `techbro`, or `cursed`).
- `text`: Pre-fill the input field with a specific string.

**Example**: `index.html?mode=hipster&text=hello`

## 🛠️ Technology Stack

- **HTML5**: Semantic structure.
- **CSS3**: Advanced layouts (Grid, Flexbox), custom properties, and animations.
- **JavaScript (ES6+)**: Vanilla JS for logic, DOM manipulation, and state management.
- **Web Speech API**: Integrated `SpeechSynthesis` for custom-tailored vocal delivery.
- **Google Fonts**: Custom typography for each mode (`SUSE`, `Tilt Neon`, `Glass Antiqua`, `Flavors`, `Dancing Script`, `Orbitron`).

## 📁 Project Structure

- `index.html`: The main entry point and structure.
- `index.css`: Styles, animations, and mode-specific themes.
- `index.js`: Main application logic and speech synthesis management.
- `modesAndProfiles.js`: Phonetic dictionary data and custom prosody profiles.
- `README.md`: Project documentation.
