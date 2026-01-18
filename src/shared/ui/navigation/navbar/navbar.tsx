import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/layout/container";
import type { NavbarItem, NavbarProps, NavbarVariant } from "./navbar.types";

const variantStyles: Record<
    NavbarVariant,
    { nav: string; brand: string; link: string }
> = {
    public: {
        nav: "bg-white text-slate-900",
        brand: "text-slate-900",
        link: "text-slate-700 hover:text-slate-900",
    },
    user: {
        nav: "bg-white text-slate-900",
        brand: "text-slate-900",
        link: "text-slate-700 hover:text-slate-900",
    },
    admin: {
        nav: "bg-slate-900 text-white",
        brand: "text-white",
        link: "text-slate-200 hover:text-white",
    },
};

export function Navbar({
    items,
    brand,
    rightSlot,
    variant = "public",
    className,
}: NavbarProps) {
    const styles = variantStyles[variant];

    return (
        <nav className={cn("border-b", styles.nav, className)}>
            <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                {brand ? (
                    <div
                        className={cn("text-base font-semibold", styles.brand)}
                    >
                        {brand}
                    </div>
                ) : null}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        {items.map((item) => (
                            <NavbarLink
                                key={
                                    typeof item.to === "string"
                                        ? item.to
                                        : JSON.stringify(item.to)
                                }
                                item={item}
                                variant={variant}
                            />
                        ))}
                    </div>
                    {rightSlot ? (
                        <div className="flex items-center gap-3 sm:ml-2">
                            {rightSlot}
                        </div>
                    ) : null}
                </div>
            </Container>
        </nav>
    );
}

function NavbarLink({
    item,
    variant,
}: {
    item: NavbarItem;
    variant: NavbarVariant;
}) {
    const styles = variantStyles[variant];
    const linkClassName = cn(
        "text-sm transition-colors",
        styles.link,
        item.disabled && "pointer-events-none opacity-60",
    );
    const linkTarget = item.to as LinkProps["to"];

    const content = (
        <span className="inline-flex items-center gap-2">
            {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
            <span>{item.label}</span>
        </span>
    );

    if (item.disabled) {
        return (
            <span className={linkClassName} aria-disabled={true}>
                {content}
            </span>
        );
    }

    return (
        <Link
            to={linkTarget}
            activeOptions={item.end ? { exact: true } : undefined}
            className={linkClassName}
        >
            {content}
        </Link>
    );
}
