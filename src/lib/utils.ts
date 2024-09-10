import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate random number between 1-100000000
export function generateRandomNumber() {
  return Math.floor(Math.random() * 100000000) + 1;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
