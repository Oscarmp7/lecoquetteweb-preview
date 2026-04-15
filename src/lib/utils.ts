import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { withBasePath } from "@/lib/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assetPath(path: string): string {
  return withBasePath(path);
}
