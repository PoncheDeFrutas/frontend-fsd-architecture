import type { LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type NavbarVariant = "public" | "user" | "admin";

export interface NavbarItem {
    label: ReactNode;
    to: LinkProps["to"] | string;
    icon?: ReactNode;
    end?: boolean;
    disabled?: boolean;
}

export interface NavbarProps {
    items: NavbarItem[];
    brand?: ReactNode;
    rightSlot?: ReactNode;
    variant?: NavbarVariant;
    className?: string;
}
