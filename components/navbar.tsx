import LogoSVG from "../components/assets/Logo";
import { Github, ExternalLink } from 'lucide-react';
import NavMobile from "./navMobile";
import { JSX } from "react";

interface NavLinkProps {
    href: string;
    label: string;
    target?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, target = "_self" }) => {
    return (
        <a href={href} target={target} className="text-sm py-2 px-3 rounded-md trainsition ease-in-out duration-200 text-neutral-300 hover:text-neutral-50 hover:bg-neutral-50/10 flex items-center gap-1">
          {label}
          {target === "_blank" && (
            <ExternalLink size={12} color={"#a3a3a3"} />
          )}
          
        </a>
    );
};

export default function Navbar(): JSX.Element {
    //NAV ITEMS
    const navItems: { href: string; label: string; target?: string }[] = [
        { href: "./", label: "Home" },
        { href: "./about", label: "About" },
        { href: "./releases", label: "Downloads" },
        { href: "./apps", label: "Apps" },
        { href: "https://carthing.wiki/thinglabs-apps/deskthing/introduction/", label: "Wiki", target: "_blank"},
        // { href: "./supporters", label: "Supporters"},
        
    ];

    const navList: JSX.Element[] = navItems.map((item, index) => (
        <li key={index}>
            <NavLink href={item.href} label={item.label} target={item.target}/>
        </li>
    ));

    return (
        <nav className="flex z-50 fixed w-screen flex-row justify-between items-center py-3 px-6 border-b border-neutral-800 bg-neutral-950/80">
            <div className="hidden sm:flex flex-row gap-5">
                <a href="./">
                    <LogoSVG />
                </a>
                <ul className="flex flex-row items-center gap-3">{navList}</ul>
            </div>
            <a
                href="https://github.com/ItsRiprod/DeskThing"
                target="_blank"
                className="hidden sm:block transition ease-in-out duration-200 p-2 text-neutral-50 hover:text-green-400 hover:bg-neutral-50/10 rounded-md"
            >
                <Github />
            </a>
            <NavMobile navItems={navItems} />
        </nav>
    );
}