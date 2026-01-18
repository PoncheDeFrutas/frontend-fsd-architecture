import { cn } from "@/shared/lib/cn";
import { alertVariants } from "./alert.variants";
import type { AlertProps } from "./alert.types";

/**
 * Alert component to display important messages to the user.
 *
 * @param {AlertProps} props - The properties for the Alert component.
 * @returns {JSX.Element} The rendered Alert component.
 */
export function Alert({ className, variant, children, ...props }: AlertProps) {
    return (
        <div
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            {children}
        </div>
    );
}
