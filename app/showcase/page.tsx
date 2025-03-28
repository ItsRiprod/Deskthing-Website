"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AboutSection from "./sections/who";
import WhatSection from "./sections/what";
import WhenSection from "./sections/when";
import WhereSection from "./sections/where";
import HowSection from "./sections/how";
import WhySection from "./sections/why";
import { ArrowDown } from "lucide-react";

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
  id: SectionId;
}

const navItems: NavItem[] = [
  { title: "WHO", subtitle: "am I?", id: "about" },
  { title: "WHAT", subtitle: "is DeskThing?", id: "apps" },
  { title: "WHEN", subtitle: "did it all start?", id: "releases" },
  { title: "WHERE", subtitle: "is it going?", id: "roadmap" },
  { title: "WHY", subtitle: "should you use it?", id: "why" },
  { title: "HOW", subtitle: "does it work?", id: "how" },
];

export default function ShowcasePage() {
  const [activeSection, setActiveSection] = useState<SectionId>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [visibleItems, setVisibleItems] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
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

  // Reset scroll position when changing sections
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  // Memoized section renderer to prevent unnecessary re-renders
  const renderSection = useCallback(() => {
    switch (activeSection) {
      case "about":
        return <AboutSection />;
      case "apps":
        return <WhatSection />;
      case "releases":
        return <WhenSection />;
      case "roadmap":
        return <WhereSection />;
      case "why":
        return <WhySection />;
      case "how":
        return <HowSection />;
      default:
        return (
          <div className="flex items-center justify-center w-full h-0 min-h-[5vh]">
            <p className="text-2xl text-neutral-400">
              Select a topic to learn more
            </p>
          </div>
        );
    }
  }, [activeSection]);

  const handleSelectItem = (itemId: SectionId) => {
    if (activeSection === itemId) return;
    setVisibleNavbar(false);
    setIsTransitioning(true);

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Set new timeout
    transitionTimeoutRef.current = setTimeout(() => {
      setActiveSection(itemId);
      setIsTransitioning(false);
    }, 300);
  };

  const handleCollapseClick = () => {
    setVisibleNavbar((prev) => !prev);
  };

  return (
    <div className="h-svh flex flex-col md:flex-row pt-nav">
      {/* Left sidebar - fixed navigation */}
      <aside
        className={`${
          visibleNavbar ? "h-[calc(100vh-6rem)] py-8" : "h-0 overflow-hidden py-0"
        } lg:py-8 px-6 z-10 md:mb-nav fixed border-b-4 border-neutral-900 lg:border-none bg-neutral-950 w-screen transition-[height;padding] duration-300 ease-in-out lg:fixed top-nav md:bottom-nav md:left-0 lg:w-1/3 lg:max-w-md lg:h-[calc(100vh-12.5rem)] overflow-y-auto flex items-center`}
      >
        <nav className="w-full md:w-auto h-full">
          <ul className="flex flex-col gap-6 md:gap-8">
            {navItems.map((item, index) => (
              <li
                key={item.id}
                className={`transform transition-all duration-500 ease-out
                  ${
                    index <= visibleItems
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
              >
                <button
                  onClick={() => handleSelectItem(item.id)}
                  className={`text-left transition-all items-center flex gap-2 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded px-2 py-1 -mx-2
                    ${
                      activeSection === item.id
                        ? "text-green-600"
                        : "text-white hover:text-green-400"
                    }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  <h2 className="text-3xl h-fit m-0 md:text-4xl font-bold">
                    {item.title}
                  </h2>
                  <p className="text-xl md:text-2xl h-fit text-neutral-500">
                    {item.subtitle}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <button
        onClick={handleCollapseClick}
        className="lg:hidden border-2 border-neutral-600 bg-neutral-900 fixed top-nav right-0 p-3 m-2 rounded-full z-20 transition-all duration-300 border-transparent hover:border-2 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
      >
        <ArrowDown
          className={`${
            visibleNavbar ? "rotate-180" : ""
          } transition-transform duration-300 ease-in-out`}
        />
      </button>

      {/* Right content area - independently scrollable */}
      <div
        className="w-full lg:w-2/3 lg:ml-[33.333%] h-[calc(100vh-6rem)] overflow-hidden flex-grow"
        aria-live="polite"
      >
        <div
          ref={contentRef}
          className="h-full overflow-y-auto md:px-6 md:px-12 py-8 md:py-12"
        >
          <div
            className={`min-h-[50vh] ${
              isTransitioning ? "animate-fadeOut" : "animate-fadeIn"
            } duration-300`}
          >
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
