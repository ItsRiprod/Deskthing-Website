"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SectionId =
  | "about"
  | "apps"
  | "releases"
  | "roadmap"
  | "why"
  | "how"
  | null;

interface NavItem {
  title: string;
  subtitle: string;
  path: string;
}

const navItems: NavItem[] = [
  { title: "WHO", subtitle: "am I?", path: "/showcase/who" },
  { title: "WHAT", subtitle: "is DeskThing?", path: "/showcase/what" },
  { title: "WHEN", subtitle: "did it all start?", path: "/showcase/when" },
  { title: "WHERE", subtitle: "is it going?", path: "/showcase/where" },
  { title: "WHY", subtitle: "should you use it?", path: "/showcase/why" },
  { title: "HOW", subtitle: "does it work?", path: "/showcase/how" },
];

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [visibleItems, setVisibleItems] = useState<number>(0);
  const [visibleNavbar, setVisibleNavbar] = useState(true);

  // Animation to reveal nav items one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev < navItems.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pathname !== "/showcase") {
      setVisibleNavbar(false);
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const handleCollapseClick = () => {
    setVisibleNavbar((prev) => !prev);
  };

  return (
    <div className="min-h-svh flex flex-col md:flex-row pt-nav">
      {/* Left sidebar - fixed navigation */}
      <aside
        className={`${
          visibleNavbar
            ? "h-[calc(100vh-6rem)] py-8"
            : "h-0 overflow-hidden py-0"
        } lg:py-8 px-6 z-10 md:mb-nav fixed border-b-4 border-neutral-900 lg:border-none bg-neutral-950 w-screen transition-[height;padding] duration-300 ease-in-out lg:fixed top-nav md:bottom-nav md:left-0 lg:w-1/3 lg:max-w-md lg:h-[calc(100vh-12.5rem)] overflow-y-auto flex items-center`}
      >
        <nav className="w-full md:w-auto h-full">
          <ul className="flex flex-col gap-6 md:gap-8">
            {navItems.map((item, index) => (
              <li
                key={item.path}
                className={`transform transition-all duration-500 ease-out
                  ${
                    index <= visibleItems
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
              >
                <Link
                  href={item.path}
                  className={`text-left transition-all items-center flex gap-2 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded px-2 py-1 -mx-2
              ${
                pathname === item.path
                  ? "text-green-600"
                  : "text-white hover:text-green-400"
              }`}
                  aria-current={pathname === item.path ? "page" : undefined}
                >
                  <h2 className="text-3xl h-fit m-0 md:text-4xl font-bold">
                    {item.title}
                  </h2>
                  <p className="text-xl md:text-2xl h-fit text-neutral-500">
                    {item.subtitle}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <button
        onClick={handleCollapseClick}
        className="lg:hidden border-2 bg-neutral-900 fixed top-nav right-0 p-3 m-2 rounded-full z-20 transition-all duration-300 border-green-500 hover:border-2 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
      >
        <ArrowDown
          className={`${
            visibleNavbar ? "rotate-180" : ""
          } transition-transform duration-300 ease-in-out`}
        />
      </button>

      {/* Right content area - independently scrollable */}
      <div
        className="w-full lg:w-2/3 lg:ml-[33.333%] flex-grow"
        aria-live="polite"
      >
        <div className="h-full md:px-6 md:px-12 py-8 md:py-12">
          <div
            key={pathname}
            className="min-h-[50vh] animate-fadeIn duration-300"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
