import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import type { buttonVariants } from "./button.variants";

type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: NonNullable<T[P]>;
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    WithRequired<VariantProps<typeof buttonVariants>, "variant"> & {
        isLoading?: boolean;
    };
