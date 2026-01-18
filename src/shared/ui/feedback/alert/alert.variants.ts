import { cva } from "class-variance-authority";

/**
 * Alert component variants using class-variance-authority (CVA).
 * Defines styles for different alert types: info, success, warning, and error.
 */
export const alertVariants = cva(
    "rounded-md border px-4 py-3 text-sm flex gap-2",
    {
        variants: {
            variant: {
                info: "bg-blue-50 text-blue-900 border-blue-200",
                success: "bg-green-50 text-green-900 border-green-200",
                warning: "bg-amber-50 text-amber-900 border-amber-200",
                error: "bg-red-50 text-red-900 border-red-200",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    },
);
