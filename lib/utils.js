import { twMerge } from "tailwind-merge"
import { clsx } from "clsx"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateStr) => {
  const parts = dateStr.split('-');
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export function formatCurrencyForIndia(amount) {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return formatter.format(amount);
}