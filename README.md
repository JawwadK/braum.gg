<div align="center">
  
# Braum.gg

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Next.js](https://img.shields.io/badge/next.js-14.0.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-18.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0.0-blue.svg)](https://www.typescriptlang.org/)

🛡️ A stylish League of Legends match analysis tool with Freljord-themed design

</div>

![Home Page](/public/screenshots/Homepage.png)

## 📋 Features

### 🎮 Match Analysis

- Detailed match statistics and timeline
- Role-based performance metrics
- Damage distribution analysis
- Interactive timeline visualization
- Team composition overview

### 📊 Player Stats

- Comprehensive summoner profiles
- Ranked statistics tracking
- Match history overview
- Performance trends analysis
- Detailed champion statistics

### 🎨 Unique Design

- Freljord/Braum-themed interface
- Responsive animations
- Interactive elements
- Dynamic particle effects
- Dark/Light theme support

![Match Analysis](/public/screenshots/MatchAnalysis.png)

## ⚙️ Core Components

<details>
<summary>Click to see component details</summary>

### Match Components

```typescript
MatchDetails     - Comprehensive match information
MatchHistory     - List of recent matches
MatchTimeline    - Interactive timeline view
Scoreboard       - Team-based statistics
```

### Stats Components

```typescript
SummonerProfile  - Player profile display
StatsDisplays    - Various statistical views
RunesDisplay     - Rune configuration display
DamageStats      - Damage analysis charts
```

### UI Components

```typescript
Navbar           - Navigation component
ThemeToggle      - Theme switching
LoadingStates    - Custom loading animations
ErrorDisplays    - Error handling components
```

</details>

![Profile Page](/public/screenshots/Profilepage.png)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm or yarn
- Riot Games API Key

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/braum.gg.git
cd braum.gg
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment variables

```bash
# Create .env.local file with your Riot API key
RIOT_API_KEY=your-api-key-here
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

## 📂 Project Structure

```
braum.gg/
├── src/
│   ├── app/          # Next.js pages and API routes
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   ├── types/        # TypeScript definitions
│   └── styles/       # CSS and styling
├── public/           # Static assets
└── config/          # Configuration files
```

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Riot Games API](https://developer.riotgames.com/) - Game data
- [Recharts](https://recharts.org/) - Data visualization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Riot Games](https://www.riotgames.com/) for the API
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- League of Legends community

## 📞 Support

If you need help with the application, feel free to:

- Open an issue on GitHub
- Contact the developer
- Check the [documentation](docs/README.md)

---

<div align="center">
Made with ❤️ by Jawwad Khan
</div>