import { cn } from "@/shared/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
    title?: ReactNode;
    description?: ReactNode;
};

/**
 * A simple card component with optional title and description.
 * @param {CardProps} props - The props for the Card component.
 * @returns {JSX.Element} The rendered Card component.
 */
export function Card({
    className,
    children,
    title,
    description,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border border-slate-200 bg-white p-4 shadow-sm",
                className,
            )}
            {...props}
        >
            {(title || description) && (
                <div className="mb-3 space-y-1">
                    {title && (
                        <h3 className="text-base font-semibold text-slate-900">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="text-sm text-slate-600">{description}</p>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
