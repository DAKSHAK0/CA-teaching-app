import { Platform } from "react-native";

export const colors = {
  background: "#07111C",
  backgroundAlt: "#0B1726",
  surface: "#101C2C",
  surfaceAlt: "#162538",
  border: "#233650",
  text: "#F6F8FC",
  muted: "#92A0B5",
  primary: "#3DD9B4",
  primaryDeep: "#1AA487",
  gold: "#F4B860",
  coral: "#FF7B66",
  sky: "#5CC7FF",
  success: "#2CD79A",
  warning: "#FFB354"
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28
};

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  pill: 999
};

export const shadows = Platform.select({
  ios: {
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 }
  },
  android: {
    elevation: 8
  },
  default: {}
});
