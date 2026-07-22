import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Shared keyboard-focus ring for interactive elements that otherwise only
// style :hover — reuses the purple-400 accent already used site-wide for
// hover states, just adds a visible focus state on top of it.
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
