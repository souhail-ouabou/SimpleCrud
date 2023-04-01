module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    mode: 'jit',
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
}
