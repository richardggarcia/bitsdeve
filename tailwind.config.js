/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                playfair: ['Playfair Display', 'serif'],
                space: ['Space Grotesk', 'sans-serif'],
                orbitron: ['Orbitron', 'monospace'],
            },
            colors: {
                'primary-blue': '#334155',
                'secondary-indigo': '#475569',
                'secondary-purple': '#64748B',
                'accent-coral': '#F97316',
                'accent-emerald': '#10B981',
                'accent-teal': '#0D9488',
                'accent-amber': '#F59E0B',
                'accent-rose': '#F43F5E',
            }
        },
    },
    plugins: [],
}
