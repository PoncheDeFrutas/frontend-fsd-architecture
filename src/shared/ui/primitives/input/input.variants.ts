import { cva } from "class-variance-authority";

/**
 * Input component variants using class-variance-authority (CVA).
 * This defines the base styles and size variants for input elements.
 */
export const inputVariants = cva(
    "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            size: {
                sm: "h-9 text-sm",
                md: "h-10 text-sm",
                lg: "h-11 text-base",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
);
