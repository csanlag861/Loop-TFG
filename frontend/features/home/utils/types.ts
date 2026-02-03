export type NavItem = {
    title: string;
    icon?: React.ReactNode;
    href: string;
    action?: "toggle" | "mode";
}