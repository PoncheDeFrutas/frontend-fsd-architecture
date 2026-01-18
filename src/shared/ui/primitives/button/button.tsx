import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";
import { buttonVariants } from "./button.variants";
import type { ButtonProps } from "./button.types";
import { Spinner } from "@/shared/ui/feedback";

/**
 * A customizable button component with support for variants, sizes, and loading state.
 *
 * @param {ButtonProps} props - The properties for the button component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    function Button(
        { variant, size, className, children, isLoading = false, ...props },
        ref,
    ) {
        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant, size }), className)}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? <Spinner size="sm" /> : children}
            </button>
        );
    },
);
