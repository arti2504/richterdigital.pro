/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Droids-style palette
        ink:   '#141414',
        paper: '#FDFDFD',
        mist:  '#EEEEEE',
        navy: {
          900: '#070A12',
          800: '#0B1022',
          700: '#111836',
        },
        electric: {
          DEFAULT: '#0711ff',
          dark:    '#0509cc',
          light:   '#4d4dff',
        },
        cream: {
          DEFAULT: '#F4F6FF',
          muted:   '#A7B0C8',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Raleway', 'system-ui', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(44px, 6vw, 84px)',  { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-2': ['clamp(34px, 4.2vw, 64px)',{ lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-3': ['clamp(28px, 3vw, 48px)',  { lineHeight: '1.1',  letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        '4xl': '40px',
        '3xl': '28px',
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow:    "0 0 30px rgba(7,17,255,0.35), 0 0 60px rgba(7,17,255,0.18)",
        'glow-lg':"0 0 40px rgba(7,17,255,0.5), 0 0 80px rgba(7,17,255,0.25)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" },                              to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "float":          { "0%, 100%": { transform: "translateY(0)" },         "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "float":          "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
