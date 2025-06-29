import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(name) {
  return `/assets/${name}`;
}

export const getEncodedRedirectUrl = (next) => {
  return `${SEARCH_PARAMS_KEYS.NEXT_REDIRECT}=${encodeURIComponent(
    next || '/'
  )}`;
};
