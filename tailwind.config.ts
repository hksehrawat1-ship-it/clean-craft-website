
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			padding: {
				'section-y-mobile': '40px',
				'section-y-desktop': '90px',
				'section-x-mobile': '20px',
				'section-x-desktop': '20px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#1A73E8',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Brand colors - core identity
				brand: {
					blue: '#1A73E8',
					'blue-dark': '#1557B0',
					'blue-light': '#E8F0FE',
				},
				cleancraft: {
					gold: '#F5B014',
					darkgold: '#E09F0F',
					light: '#FFF9E6',
				},
				// Legacy Google colors (deprecated - use brand.blue instead)
				google: {
					blue: '#1A73E8', // Updated to match brand
					red: '#EA4335',
					yellow: '#FBBC05',
					green: '#1A73E8', // Updated to brand blue instead of green
					gray: '#5F6368',
					lightgray: '#F1F1F1',
				}
			},
			fontFamily: {
				sans: ['Product Sans', 'system-ui', 'sans-serif']
			},
			fontSize: {
				'heading': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'heading-mobile': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'subheading': ['20px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
				'subheading-mobile': ['18px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
				'p': ['18px', { lineHeight: '1.6' }],
				'p-mobile': ['16px', { lineHeight: '1.6' }],
				'button': ['17px', { lineHeight: '1.5' }],
				'button-mobile': ['16px', { lineHeight: '1.5' }]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'float-delayed': 'float 3s ease-in-out infinite 1.5s',
			}
		}
	},
	plugins: [animate],
} satisfies Config;

export default config;
