module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '350px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      '2xl': '1720px',
      '3xl': '2024px',
      '4xl': '2400px',
      '5xl': '2880px',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Mukta', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#38bdf8',
          secondary: '#F471B5',
          accent: '#818CF8',
          neutral: '#1E293B',
          'neutral-focus': '#273449',
          'base-100': '#0F172A',
          info: '#0CA5E9',
          success: '#2DD4BF',
          warning: '#F4BF50',
          error: '#FB7085',
        },
      },
      {
        light: {
          primary: '#8C0327',
          secondary: '#D85251',
          accent: '#D59B6A',
          neutral: '#826A5C',
          'base-100': '#f1f1f1',
          info: '#42ADBB',
          success: '#499380',
          warning: '#E97F14',
          error: '#DF1A2F',
        },
      },
    ],
    darkTheme: 'dark',
    defaultTheme: 'light',
  },
};
