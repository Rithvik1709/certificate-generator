# Certificate Generator

A modern, user-friendly web application for creating beautiful, customizable certificates. Simply describe your certificate design and content in natural language, and the app will generate a professional certificate ready for download as PNG or PDF.

## ✨ Features

- **Natural Language Input**: Describe your certificate design using plain English, and the app will automatically extract relevant information
- **Multiple Templates**: Choose from 6 professional templates:
  - Elegant
  - Modern
  - Classic
  - Vintage
  - Corporate
  - Academic
- **Customizable Design Options**:
  - 8 color schemes (Gold, Blue, Green, Red, Purple, Teal, Black, Gray)
  - Multiple font families (Serif, Sans-serif, Cursive, Monospace)
  - Various border styles (Solid, Double, Dashed, Dotted, None)
  - Adjustable border width
  - Portrait or Landscape orientation
- **Real-time Preview**: See your certificate update in real-time as you make changes
- **Export Options**: Download certificates as high-quality PNG or PDF files
- **Fully Responsive**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rithvik1709/certificate-generator.git
cd certificate-generator
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 Usage

### Quick Start

1. **Enter a Design Prompt**: Describe your certificate in the text area. For example:
   ```
   Create an elegant gold certificate with ornate borders for a programming competition awarded to Jane Doe
   ```

2. **Generate**: Click the "Generate Certificate" button and wait for the AI to process your prompt

3. **Customize** (Optional): Fine-tune the certificate by clicking "Customize Certificate" to adjust:
   - Content (recipient name, title, description, issuer, date, signature)
   - Design (template, colors, fonts, borders, orientation)

4. **Download**: Export your certificate as PNG or PDF using the download buttons

### Prompt Examples

- `"Certificate of Achievement for John Smith completing the advanced web development course issued by Tech Academy"`
- `"Create a modern blue certificate for winning the hackathon by Jane Doe on December 15, 2024"`
- `"Elegant purple diploma for outstanding performance in mathematics awarded to Alex Johnson from City University"`

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) - Performant forms with validation
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) - PDF creation library
- **Image Export**: [html-to-image](https://github.com/bubkoo/html-to-image) - Convert HTML to image
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library

## 📁 Project Structure

```
certificate-generator/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── certificate-generator.tsx  # Main generator component
│   ├── certificate.tsx   # Certificate display component
│   ├── certificate-preview.tsx   # Preview component
│   └── loading-state.tsx # Loading animation
├── lib/                  # Utility functions
│   ├── prompt-processor.ts  # Natural language processing
│   └── utils.ts          # Helper functions
├── public/              # Static assets
├── styles/              # Additional styles
└── package.json         # Dependencies and scripts
```

## 🎨 Customization

The certificate generator supports extensive customization through both natural language prompts and manual controls:

### Through Prompts
Keywords in your prompt are automatically detected:
- **Colors**: "gold", "blue", "green", "red", "purple", "teal", "black"
- **Templates**: "elegant", "modern", "classic", "vintage", "corporate", "academic"
- **Fonts**: "serif", "sans-serif", "cursive", "monospace"

### Manual Controls
Access the customization panel after generation to fine-tune:
- Certificate content (names, titles, descriptions)
- Design elements (colors, fonts, borders)
- Layout orientation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## 🐛 Known Issues

- None at the moment. Please report any bugs you find!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rithvik1709**

- GitHub: [@Rithvik1709](https://github.com/Rithvik1709)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for creating beautiful certificates**
