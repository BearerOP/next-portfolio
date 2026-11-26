import type { Config } from "tailwindcss";
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  			mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
  			hand: ['var(--font-hand)', 'cursive'],
  			instrument: [
  				'var(--font-instrument-serif)',
  				'serif'
  			]
  		},
  		// Type roles that sit below Tailwind's `xs`: drawing annotations
  		fontSize: {
  			label: ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
  			caption: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }]
  		},
  		// Construction-line roles (see globals.css)
  		backgroundImage: {
  			hatch: 'repeating-linear-gradient(-45deg, transparent, transparent 4px, var(--hatch) 4px, var(--hatch) 5px)',
  			grid: 'linear-gradient(var(--line-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)'
  		},
  		backgroundSize: {
  			'grid-cell': '20px 20px'
  		},
  		// Disclosure rows: animating between these animates to the content's real height
  		gridTemplateRows: {
  			open: '1fr',
  			closed: '0fr'
  		},
  		// Press feedback
  		scale: {
  			press: '0.97'
  		},
  		gridTemplateColumns: {
  			frame: 'minmax(0, 1fr) minmax(0, 48rem) minmax(0, 1fr)'
  		},
  		// `ease-out` / `ease-in-out` resolve to the strong curves, so every
  		// transition in the app shares one easing vocabulary
  		transitionTimingFunction: {
  			out: 'var(--ease-out)',
  			'in-out': 'var(--ease-in-out)'
  		},
  		transitionDuration: {
  			press: 'var(--duration-press)',
  			ui: 'var(--duration-ui)',
  			panel: 'var(--duration-panel)'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			line: {
  				DEFAULT: 'var(--line)',
  				subtle: 'var(--line-subtle)',
  				strong: 'var(--line-strong)'
  			},
  			fill: {
  				DEFAULT: 'var(--fill)',
  				strong: 'var(--fill-strong)'
  			},
  			live: 'hsl(var(--live))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			boxShadow: {
  				dark: '0 35px 60px -15px rgba(255, 255, 255, 1)',
  				light: '0 35px 60px -15px rgba(0, 0, 0, 0.3)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			drift: {
  				from: { transform: 'translateY(4px)' },
  				to: { transform: 'translateY(-6px)' }
  			},
  			shimmer: {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shimmer-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shimmer-width)) 0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			shimmer: 'shimmer 8s infinite',
  			// Slow hover for something floating free of the drawing
  			drift: 'drift 3.2s var(--ease-in-out) infinite alternate'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"), 
    addVariablesForColors,
  ],
};

export default config;