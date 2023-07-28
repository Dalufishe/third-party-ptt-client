import resolveConfig from "tailwindcss/resolveConfig";
const tailwindcss_config_js = require("../tailwind.config");

const tailwind_config = resolveConfig(tailwindcss_config_js);

export { tailwind_config };
