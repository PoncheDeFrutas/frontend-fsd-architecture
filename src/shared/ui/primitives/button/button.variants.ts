import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                primary:
                    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600",
                secondary:
                    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-slate-300",
                ghost: "bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-200",
            },
            size: {
                sm: "h-9 px-3 text-sm",
                md: "h-10 px-4 text-sm",
                lg: "h-11 px-5 text-base",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
);
