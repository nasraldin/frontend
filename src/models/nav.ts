export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  // icon?: keyof typeof Icons;
  icon?: string;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {
  items?: MainNavItem[];
}

export interface SidebarNavItem extends NavItemWithChildren {}

export interface FooterNavItem extends NavItemWithChildren {}
