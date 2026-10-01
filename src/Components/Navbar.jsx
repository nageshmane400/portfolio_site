import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiCode, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const TITLE = "Full-Stack Developer";

/* gradient stops — each letter picks a color along cyan→purple→pink */
const GRADIENT_COLORS = [
  "#22d3ee","#21cff0","#1fcaf2","#38bdf8","#60a5fa",
  "#818cf8","#a78bfa","#c084fc","#d946ef","#e879f9",
  "#f472b6","#fb7185","#f472b6","#e879f9","#d946ef",
  "#c084fc","#a78bfa","#818cf8","#60a5fa",
];

function BouncingTitle() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCycle((c) => c + 1), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="flex flex-wrap">
      {TITLE.split("").map((char, i) => (
        <motion.span
          key={`${cycle}-${i}`}
          style={{ color: GRADIENT_COLORS[i % GRADIENT_COLORS.length] }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: "easeOut",
          }}
          className="inline-block text-[10px] font-extrabold sm:text-xs"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

const links = [
  { to: "/",        label: "Home"    },
  { to: "/about",   label: "About"   },
  { to: "/skills",  label: "Skills"  },
  { to: "/work",    label: "Work"    },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 sm:px-4 ${
      isActive
        ? "bg-cyan-400 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.4)]"
        : "text-slate-300 hover:bg-white/8 hover:text-cyan-100"
    }`;

  const menuLinks = isLoggedIn ? [...links, { to: "/notes", label: "Notes" }] : links;

  return (
    <motion.nav
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 z-50 w-full px-3 py-3 text-white sm:px-4 sm:py-4 md:px-8"
    >
      <motion.div
        animate={{
          boxShadow: scrolled
            ? "0 16px 55px rgba(0,0,0,0.45), 0 0 28px rgba(0,240,255,0.07)"
            : "0 16px 55px rgba(0,0,0,0.25)",
          borderColor: scrolled ? "rgba(0,240,255,0.18)" : "rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border bg-slate-950/80 px-3 py-2.5 backdrop-blur-xl sm:rounded-3xl sm:px-4 sm:py-3"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 sm:gap-3"
          onClick={() => setIsOpen(false)}
        >
          <motion.span
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-lg text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.45)] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-xl"
          >
            <FiCode />
          </motion.span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-wide sm:text-base">Nagesh Mane</span>
            <BouncingTitle />
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {menuLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-400/10"
              >
                <FiLogOut /> Logout
              </button>
            </li>
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/8 bg-white/5 text-lg text-cyan-100 transition hover:border-cyan-300/28 hover:bg-white/10 md:hidden sm:h-11 sm:w-11 sm:rounded-2xl sm:text-xl"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: -80, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 80, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/8 bg-slate-950/94 p-2.5 shadow-2xl backdrop-blur-xl md:hidden sm:rounded-3xl sm:p-3"
          >
            <div className="grid gap-1">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                >
                  <NavLink
                    to={link.to}
                    className={navClass}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              {isLoggedIn && (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-400/10"
                >
                  <FiLogOut /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
