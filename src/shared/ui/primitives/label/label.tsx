import type { LabelHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

/**
 * A simple label component for form elements.
 *
 * @param {LabelProps} props - The properties for the label component.
 * @returns {JSX.Element} The rendered label element.
 */
export function Label({ className, ...props }: LabelProps) {
    return (
        <label
            className={cn("text-sm font-medium text-slate-800", className)}
            {...props}
        />
    );
}
