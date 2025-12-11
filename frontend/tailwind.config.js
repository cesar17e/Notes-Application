import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest"],
  },
};





// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         thinktheme: {
//           "primary": "#00FF9D",
//           "primary-focus": "#00cc7d",

//           "neutral": "#181818",

//           "base-100": "#0F0F0F",
//           "base-200": "#000000",
//           "base-300": "#141414",

//           "info": "#8ab4f8",
//           "success": "#00FF9D",
//           "warning": "#fbbc04",
//           "error": "#ff6d6d",

//           // Required DaisyUI variables
//           "--rounded-box": "1rem",
//           "--rounded-btn": "0.7rem",
//           "--rounded-badge": "0.5rem",
//           "--rounded-input": "0.75rem",
//         },
//       },
//     ],
//     darkTheme: "thinktheme", // tells DaisyUI "this *is* the dark theme"
//   },
// };


