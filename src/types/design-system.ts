import tokens from "../../tokens.json";

export type BrandColor = keyof typeof tokens.global.color;
export type CardRadius = keyof typeof tokens.global.size.radius;
export type TextSize = keyof typeof tokens.global.size.text;

export const BG_VARIANTS: Record<BrandColor, string> = {
  brand: "bg-brand",
  success: "bg-success",
  dark: "bg-dark",
  muted: "bg-muted",
  light: "bg-light",
};

export const TEXT_COLOR_CLASSES: Record<BrandColor, string> = {
  brand: "text-brand",
  success: "text-success",
  dark: "text-dark",
  muted: "text-muted",
  light: "text-light",
};

export const RADIUS_CLASSES: Record<CardRadius, string> = {
  card: "rounded-card",
  button: "rounded-button",
};

export const RADIUS_TOP_CLASSES: Record<CardRadius, string> = {
  card: "rounded-t-card",
  button: "rounded-t-button",
};

export const TEXT_ON_BG: Record<BrandColor, BrandColor> = {
  brand: "light",
  success: "light",
  dark: "light",
  muted: "light",
  light: "dark",
};
