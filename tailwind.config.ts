import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-pink': '#ffd9d975',
        'wedding-green': '#0B5F3C',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        'float-with-pause': {
          '0%': { 
            transform: 'translateY(0)', 
            opacity: '0' 
          },
          '20%': { 
            transform: 'translateY(calc(-100vh * var(--message-index) / var(--message-count)))', 
            opacity: '0.6' 
          },
          '30%': { 
            transform: 'translateY(calc(-100vh * var(--message-index) / var(--message-count)))', 
            opacity: '0.6' 
          },
          '100%': { 
            transform: 'translateY(-100vh)', 
            opacity: '0' 
          }
        }
      },
      animation: {
        'float-with-pause': 'float-with-pause 6s ease-in-out infinite'
      }
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.perspective-1000': {
          'perspective': '1000px',
        },
      })
    },
  ],
};

export default config;
