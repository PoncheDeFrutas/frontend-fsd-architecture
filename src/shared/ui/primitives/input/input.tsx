import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";
import type { InputProps } from "./input.types";
import { inputVariants } from "./input.variants";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { className, size, ...props },
    ref,
) {
    return (
        <input
            ref={ref}
            className={cn(inputVariants({ size }), className)}
            {...props}
        />
    );
});
