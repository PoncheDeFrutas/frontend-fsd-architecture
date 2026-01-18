import type { VariantProps } from "class-variance-authority";
import type { alertVariants } from "./alert.variants";
import type { HTMLAttributes } from "react";

export type AlertProps = HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants>;
