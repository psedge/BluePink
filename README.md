# BluePink

A Swedish language learning app focused on mastering noun genders and vocabulary. Learn the difference between "en" and "ett" words through interactive exercises and examples.

## Features

- **Gender Learning**: Practice Swedish noun genders (en/ett) with immediate feedback
- **Vocabulary Building**: Learn 695+ common Swedish words with example sentences
- **Audio Support**: Hear correct pronunciation with built-in audio features
- **Progressive Learning**: Track your progress as you master Swedish grammar

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system:
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/psedge/BluePink.git
cd BluePink/bluepink
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

The app will automatically reload when you make changes to the code.

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run deploy`
Deploys the app to GitHub Pages

## How to Use

1. **Home Page**: Start your Swedish learning journey
2. **Gender Practice**: Navigate to `/genders` to practice noun genders
3. **Interactive Learning**: Click through vocabulary cards to see:
   - English word
   - Swedish translation
   - Correct gender form (en/ett)
   - Example sentences in both languages

## Project Structure

```
src/
├── App.js          # Main application router
├── Root.js         # Landing page component
├── Genders.js      # Gender learning interface
├── Sound.js        # Audio functionality
└── *.css          # Styling files

public/
├── final.json      # Vocabulary data
└── svg/           # Flag icons and assets
```

## Data

The app includes vocabulary covering:
- Common household items
- Animals and nature
- Food and drinks
- Transportation
- Technology
- Places and locations
- And much more!

## Contributing

Contributions are welcome! Feel free to:
- Add new vocabulary entries
- Improve translations
- Fix gender errors
- Enhance the user interface

## License

This project is open source and available under the MIT License.

## Learn More

- [Swedish Grammar Guide](https://en.wikipedia.org/wiki/Swedish_grammar)
- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)