import type { InputHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { inputVariants } from "./input.variants";

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants>;
