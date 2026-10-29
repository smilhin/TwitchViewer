import {NavLink, useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useLogout} from "@/hooks/useLogout.ts";
import {ChevronDown} from "lucide-react";

const links = [
    {to: "/", label: "Streamers"},
    {to: "/watch", label: "Watch"},
];

const navItem = "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent";

export function Nav() {
    const {mutate: logout} = useLogout();
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto grid h-14 max-w-6xl grid-cols-3 items-center px-6">
                <div className="flex justify-start font-semibold"><img src={"/logo.png"} alt={""}
                                                                       className="h-8 w-auto mr-2"/>TwitchViewer
                </div>

                <nav className="flex justify-center gap-1">
                    {links.map(({to, label}) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({isActive}) =>
                                cn(
                                    "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                                    isActive ? "bg-accent text-foreground" : "text-muted-foreground"
                                )
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={cn(
                                navItem,
                                "group flex items-center gap-1 text-muted-foreground outline-none aria-expanded:bg-accent"
                            )}
                        >
                            Account
                            <ChevronDown
                                className="size-4 transition-transform duration-200 group-aria-expanded:rotate-180"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem onClick={() => navigate("/account")}>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => logout()}>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                <div className="flex justify-end"><a target="_blank" rel="noopener noreferrer"
                                                     href="https://github.com/smilhin">Me on GitHub!</a></div>
            </div>
        </header>
    );
}