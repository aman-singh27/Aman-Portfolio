/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
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
        },
        extend: {
            fontFamily: {
                display: ['"Bodoni Moda"', "serif"],
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
                anton: ["Anton", "sans-serif"],
            },
            letterSpacing: {
                tightest: "-0.04em",
                widest: "0.3em",
            },
            borderRadius: {
                section: "56px",
                card: "32px",
            },
            colors: {
                base: "#000000",
                card: "#0a0a0a",
            },
        },
    },
    plugins: [],
}
