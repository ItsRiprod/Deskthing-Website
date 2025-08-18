"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Download } from "lucide-react";
import { formatCompactNumber } from "../utils/formatNumber";

type PastRelease = {
  id?: string | number;
  name?: string;
  tag?: string;
  created_at?: string | number | Date;
  size?: number; // bytes
  downloads?: number;
  download_url: string;
};

const MODE: "fixed" | "match" = "fixed";
const MENU_WIDTH_PX = 256;
const GAP_PX = 8;
const RIGHT_ALIGN = true;
const DURATION_MS = 200; // keep in sync with Tailwind duration classes

export default function ReleasesDropdown({ pastReleases }: { pastReleases: PastRelease[] }) {
  const [open, setOpen] = useState(false);        // portal mounted or not
  const [visible, setVisible] = useState(false);  // triggers CSS transition
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const measureFromButton = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const width = MODE === "fixed" ? MENU_WIDTH_PX : rect.width;
    const left = RIGHT_ALIGN ? rect.right - width : rect.left;
    setCoords({ top: rect.bottom + GAP_PX, left, width });
  };

  const openMenu = () => {
    measureFromButton();
    setOpen(true);
    // ensure the first frame renders hidden, then flip to visible to animate in
    requestAnimationFrame(() => setVisible(true));
  };

  const closeMenu = () => {
    // flip to hidden; we'll unmount after the transition finishes
    setVisible(false);
  };

  // Keep position synced & handle esc/outside click while open
  useEffect(() => {
    if (!open) return;

    const onResize = () => measureFromButton();
    const onScroll = () => measureFromButton();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return; // button toggles itself
      closeMenu();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open]);

  // Only unmount AFTER the outro finishes
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const onEnd = (ev: TransitionEvent) => {
      // only act on transform/opacity transitions from the menu itself
      if (ev.target !== el) return;
      if (!visible) {
        setOpen(false); // unmount portal after fade/slide-out completed
      }
    };

    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [visible]);

  const hasItems = Array.isArray(pastReleases) && pastReleases.length > 0;

  return (
    <div className="relative w-full">
      <button
        ref={btnRef}
        onClick={() => (open ? closeMenu() : openMenu())}
        aria-haspopup="menu"
        aria-expanded={open && visible}
        className="px-3 py-2 border border-neutral-800 w-full rounded-lg flex justify-between items-center text-sm text-neutral-400 hover:bg-neutral-50/10 transition ease-in-out duration-200"
      >
        Releases
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${open && visible ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-hidden={!visible}
            className={`fixed z-[9999] rounded-lg border border-neutral-800 bg-neutral-925 overflow-hidden
                        transform-gpu origin-top pointer-events-auto
                        transition-opacity transition-transform duration-00 ease-out
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
            style={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
              boxSizing: "border-box",
              willChange: "transform, opacity",
            }}
          >
            <ul className="py-1 max-h-64 overflow-auto divide-y divide-neutral-800">
              {hasItems ? (
                pastReleases.map((r, i) => {
                  const label = r.name || r.tag || `Release ${i + 1}`;
                  const date = r.created_at ? new Date(r.created_at).toLocaleDateString() : "";
                  const sizeMB = typeof r.size === "number" ? `${(r.size / 1024 / 1024).toFixed(2)} MB` : "";
                  const downloads = typeof r.downloads === "number" ? `${formatCompactNumber(r.downloads)} dl` : "";
                  return (
                    <li key={r.id ?? i}>
                      <a
                        href={r.download_url}
                        target="_blank"
                        className="group flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-neutral-800 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="truncate">{label}</div>
                          <div className="text-xs text-neutral-500">
                            {date}
                            {sizeMB && ` • ${sizeMB}`}
                            {downloads && ` • ${downloads}`}
                          </div>
                        </div>
                        <Download
                          size={16}
                          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-3 text-sm text-neutral-400">No past releases</li>
              )}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
