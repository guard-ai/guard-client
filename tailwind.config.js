/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				"OswaldExtraLight": "Oswald_200ExtraLight",
				"OswaldLight": "Oswald_300Light",
				"Oswald": "Oswald_400Regular",
				"OswaldMedium": "Oswald_500Medium",
				"OswaldSemiBold": "Oswald_600SemiBold",
				"OswaldBold": "Oswald_700Bold",
			}
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
};
