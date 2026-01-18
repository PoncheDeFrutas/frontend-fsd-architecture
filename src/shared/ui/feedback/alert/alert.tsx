import { cn } from "@/shared/lib/cn";
import { alertVariants } from "./alert.variants";
import type { AlertProps } from "./alert.types";

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
