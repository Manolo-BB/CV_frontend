/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#62A364',
        secondary: '#D0E562',
        tertiary: '#93C48B',
        primaryButton: '#2F272B',
        secondaryButton: '#D0E562',
        accent: '#F59E0B',
        background: '#EBE4D5',
        textPrimary: '#1F2937',
        textSecondary: '#555555',

        listPrimary: '#8BC77E',
        listSecondary: '#95B88D',
        backgroundComp: '#f0f4f8',
        cardBg: '#f0f4f8',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter font globally
        heading: ['Poppins', 'sans-serif'], // Use Poppins for headings
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for cards
        button: '0 2px 4px rgba(0, 0, 0, 0.1)', // Custom shadow for buttons
      },
      borderRadius: {
        xl: '1rem', // Extra large border radius
      },
    },
  },
  plugins: [],
}
