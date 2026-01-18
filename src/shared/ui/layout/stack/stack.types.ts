import type { HTMLAttributes } from "react";

type Direction = "row" | "col";
type Gap = "2" | "3" | "4" | "6" | "8";
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
    direction?: Direction;
    smDirection?: Direction;
    mdDirection?: Direction;
    lgDirection?: Direction;
    gap?: Gap;
    align?: Align;
    justify?: Justify;
};
