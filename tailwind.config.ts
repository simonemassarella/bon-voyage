import type { Config } from "tailwindcss";
import tokens from "./tokens.json";

const { color, size } = tokens.global;

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: color.brand.value,
        success: color.success.value,
        dark: color.dark.value,
        muted: color.muted.value,
        light: color.light.value,
      },
      fontSize: {
        badge: size.text.badge.value,
        base: size.text.base.value,
        heading: size.text.heading.value,
      },
      borderRadius: {
        card: size.radius.card.value,
        button: size.radius.button.value,
      },
    },
  },
};

export default config;
