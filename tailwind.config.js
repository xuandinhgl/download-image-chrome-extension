/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
    mode: "jit",
    darkMode: "class",
    content: ["./**/*.{ts,tsx}"],
    theme: {
        fontFamily: {
            serif: ["Georgia", "serif"]
        }
    },
    variants: { extend: { typography: ["dark"] } },
}