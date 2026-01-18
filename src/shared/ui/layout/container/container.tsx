import { cn } from "@/shared/lib/cn";
import type { ContainerProps } from "./container.types";

const sizeClass: Record<NonNullable<ContainerProps["size"]>, string> = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-none",
};

export function Container({
    className,
    children,
    size = "lg",
    padded = true,
    ...props
}: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full",
                sizeClass[size],
                padded && "px-4 sm:px-6 lg:px-8",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
