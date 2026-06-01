module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'manulife-primary': '#00A455',
        'manulife-dark': '#006635',
        'manulife-darkest': '#002915',
        'surface-calm': '#F5F5F5',
        'surface-card': '#FFFFFF',
        'text-main': '#000000'
      },
      boxShadow: {
        soft: '0 8px 20px rgba(3,7,18,0.06)',
        elevated: '0 12px 30px rgba(3,7,18,0.10)',
        glow: '0 8px 30px rgba(0,164,85,0.18)'
      },
      keyframes: {
        'rhythm-pulse': {
          '0%': { transform: 'scale(1)', boxShadow: '0 8px 20px rgba(0,164,85,0.06)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 14px 28px rgba(0,164,85,0.12)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 8px 20px rgba(0,164,85,0.06)' },
        }
      },
      animation: {
        'rhythm-pulse': 'rhythm-pulse 1600ms cubic-bezier(.22,.9,.3,1) infinite'
      },
      borderRadius: {
        rhythm: '12px',
        pill: '9999px'
      },
      backgroundImage: theme => ({
        'rhythm-gradient': 'linear-gradient(180deg, rgba(0,166,81,0.06) 0%, rgba(0,166,81,0) 60%)',
        'rhythm-sheen': 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02))'
      })
    },
  },
  plugins: [],
}
