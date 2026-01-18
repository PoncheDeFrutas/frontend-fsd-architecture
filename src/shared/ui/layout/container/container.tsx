import { cn } from "@/shared/lib/cn";
import type { ContainerProps } from "./container.types";

const sizeClass: Record<NonNullable<ContainerProps["size"]>, string> = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-none",
};

/**
 * A responsive container component that centers its content and applies horizontal padding.
 *
 * @param {string} [className] - Additional CSS classes to apply to the container.
 * @param {React.ReactNode} children - The content to be wrapped inside the container.
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} [size='lg'] - The maximum width of the container.
 * @param {boolean} [padded=true] - Whether to apply horizontal padding to the container.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props] - Additional HTML attributes for the container div.
 * @returns {JSX.Element} The rendered container component.
 */
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
