import { cn } from "@/shared/lib/cn";
import type { StackProps } from "./stack.types";

const directionClass = (
    prefix: string | null,
    dir?: StackProps["direction"],
) => (dir ? `${prefix ?? ""}flex-${dir}`.trim() : null);

const gapClass: Record<NonNullable<StackProps["gap"]>, string> = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
};

const alignClass: Record<NonNullable<StackProps["align"]>, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};

const justifyClass: Record<NonNullable<StackProps["justify"]>, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
};

/**
 * A flexible layout component that arranges its children
 * in a stack (either vertically or horizontally)
 * with customizable direction, gap, alignment, and justification.
 * @param {StackProps} props - The properties for configuring the Stack component.
 * @returns {JSX.Element} The rendered Stack component.
 */
export function Stack({
    className,
    children,
    direction = "col",
    smDirection,
    mdDirection,
    lgDirection,
    gap = "4",
    align,
    justify,
    ...props
}: StackProps) {
    return (
        <div
            className={cn(
                "flex",
                directionClass(null, direction),
                directionClass("sm:", smDirection),
                directionClass("md:", mdDirection),
                directionClass("lg:", lgDirection),
                gapClass[gap],
                align ? alignClass[align] : null,
                justify ? justifyClass[justify] : null,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
