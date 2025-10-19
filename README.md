# Code Mage 🧙‍♂️

A modern, interactive coding education platform built with React, TypeScript, and Vite. Code Mage provides an engaging learning experience with syntax-highlighted code examples, interactive lessons, and a beautiful, responsive design.

## 🌟 Features

- **Interactive Lessons**: Step-by-step coding tutorials with syntax highlighting
- **Modern UI**: Beautiful, responsive design with smooth animations using Framer Motion
- **Multi-Language Support**: Syntax highlighting for multiple programming languages
- **Markdown-Based Content**: Easy-to-maintain lesson content using Markdown with frontmatter
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **Type Safety**: Full TypeScript support for better development experience
- **Code Quality**: Pre-commit hooks with ESLint and Prettier for consistent code style

## 🚀 Live Demo

Visit the live application: [https://m-hammad-faisal.github.io/code-mage/](https://m-hammad-faisal.github.io/code-mage/)

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Markdown Processing**: Remark, Rehype
- **Syntax Highlighting**: Rehype Highlight
- **Icons**: Lucide React
- **Code Quality**: ESLint, Prettier, Husky, Lint-staged

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/M-Hammad-Faisal/code-mage.git
   cd code-mage
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
code-mage/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── data/             # Lesson data and content
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── styles/           # Global styles
├── .husky/               # Git hooks configuration
├── .github/workflows/    # GitHub Actions CI/CD
└── ...
```

## 📝 Adding New Lessons

1. Create a new Markdown file in `src/data/lessons/`
2. Add frontmatter with lesson metadata:

   ```markdown
   ---
   title: "Your Lesson Title"
   description: "Brief description of the lesson"
   difficulty: "beginner" | "intermediate" | "advanced"
   duration: "30 minutes"
   language: "javascript"
   ---

   # Your lesson content here
   ```

3. Update the lessons index to include your new lesson

## 🔄 Pre-commit Hooks

This project uses Husky and lint-staged to ensure code quality:

- **ESLint**: Checks for code quality and potential errors
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Type checking for better code reliability

The pre-commit hooks automatically run on staged files before each commit.

## 🚀 Deployment

The project is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch.

### Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   The `deploy.yml` workflow handles automatic deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad Hammad Faisal**

- GitHub: [@M-Hammad-Faisal](https://github.com/M-Hammad-Faisal)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- All the open-source contributors who made this project possible

---

Made with ❤️ by [Muhammad Hammad Faisal](https://github.com/M-Hammad-Faisal)
