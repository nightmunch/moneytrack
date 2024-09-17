"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationBar({ className }: { className?: string }) {
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	const navItems = [
		{ href: "/", label: "MoneyTrack" },
		{ href: "/transactions", label: "Transactions" },
		{ href: "/claims", label: "Claims" },
	];

	return (
		<NavigationMenu className={className}>
			<NavigationMenuList className="flex items-center">
				{navItems.map(({ href, label }, index) => (
					<React.Fragment key={href}>
						{index > 0 && <div className="h-4 w-px bg-gray-300 mx-2" />}
						<NavigationMenuItem>
							<Link href={href} legacyBehavior passHref>
								<NavigationMenuLink
									className={cn(
										navigationMenuTriggerStyle(),
										isActive(href) && "text-primary hover:text-primary"
									)}
								>
									{label}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</React.Fragment>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
