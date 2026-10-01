import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiDownload, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

const roles = [
  "Full-Stack Developer",
  "React.js Developer",
  "Node.js Developer",
  "MERN Stack Developer",
];

const stats = [
  { count: 1.5, suffix: "+", label: "Years Experience" },
  { count: 2, suffix: "+", label: "Companies" },
  { count: 2, suffix: "+", label: "Live Projects" },
  { count: 250, suffix: "+", label: "DSA Problems Solved" },
];

function TypeWriter({ words }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting && subIndex === words[index].length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? 50 : 85
    );
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words]);

  return (
    <span className="text-cyan-400">
      {words[index].substring(0, subIndex)}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block"
      >
        |
      </motion.span>
    </span>
  );
}

const socialLinks = [
  { icon: <FaGithub size={16} />, href: "https://github.com/nagesh5454", label: "GitHub" },
  { icon: <FaLinkedinIn size={16} />, href: "https://linkedin.com/in/nageshmane/", label: "LinkedIn" },
];

export default function Firstpage() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a14] text-white">
      {/* Grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Ambient orbs */}
      {[
        { cls: "h-[500px] w-[500px] bg-cyan-500/15 -top-32 -left-32", delay: 0, dur: 7 },
        { cls: "h-[350px] w-[350px] bg-purple-600/12 top-1/2 -right-24", delay: 2, dur: 9 },
        { cls: "h-[280px] w-[280px] bg-blue-500/10 bottom-24 left-1/3", delay: 4, dur: 8 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute rounded-full blur-3xl ${orb.cls}`}
          animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* ── Hero Card ── */}
      <div className="px-4 pb-8 pt-24 sm:px-6 md:px-8 lg:px-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-screen-xl flex-col-reverse items-center justify-between gap-10 overflow-hidden rounded-[28px] border border-cyan-300/15 bg-[#0e0e1c] p-6 shadow-[0_24px_90px_rgba(0,240,255,0.14)] sm:p-8 md:flex-row md:p-10 lg:p-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

          {/* Left */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative z-10 w-full text-center md:w-3/5 md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-cyan-400"
              />
              Available for Opportunities
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-1 text-sm font-medium tracking-widest text-slate-400 sm:text-base"
            >
              Hello, It&apos;s Me
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="mb-2 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Nagesh Mane
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-5 text-lg font-extrabold sm:text-xl lg:text-2xl"
            >
              <TypeWriter words={roles} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58 }}
              className="mb-6 max-w-lg text-sm leading-7 text-slate-300 sm:text-base sm:leading-8"
            >
              Software Developer with{" "}
              <span className="font-bold text-cyan-300">1.5+ year of hands-on experience</span> building
              full-stack web applications with the MERN stack. Experienced in React.js, Node.js,
              Express.js, REST APIs, and Redux Toolkit, with working exposure to Next.js, Nest.js,
              PostgreSQL, Docker, and Prisma.
            </motion.p>

            {/* Social icons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="mb-6 flex justify-center gap-3 md:justify-start"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.25, rotate: 10, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/50 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_18px_rgba(0,240,255,0.4)] sm:h-11 sm:w-11"
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72 }}
              className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 32px rgba(0,240,255,0.55)" }}
                whileTap={{ scale: 0.95 }}
                href="/NageshMane_Resume.pdf"
                download="NageshMane_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] transition hover:bg-cyan-300 sm:px-7 sm:py-3"
              >
                <FiDownload /> Download CV
              </motion.a>
              <MotionLink
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/35 px-6 py-2.5 text-sm font-bold text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 sm:px-7 sm:py-3"
              >
                <FiMail /> Contact Me
              </MotionLink>
            </motion.div>
          </motion.div>

          {/* Right — profile image */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="relative z-10 flex w-full shrink-0 justify-center md:w-2/5 md:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-[35%] border-2 border-dashed border-cyan-400/30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-[35%] border border-dashed border-purple-400/15"
              />
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0,255,255,0.5)" }}
                className="relative h-44 w-44 overflow-hidden rounded-[30%] border-4 border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.5)] sm:h-56 sm:w-56 lg:h-64 lg:w-64"
              >
                <motion.div
                  className="absolute inset-0 z-0"
                  animate={{ boxShadow: ["0 0 20px #00f0ff30", "0 0 50px #00f0ff80", "0 0 20px #00f0ff30"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <img
                  src="/nageshPhoto.png"
                  alt="Nagesh Mane"
                  className="relative  bottom z-20 h-full w-full object-contain object-center"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Tagline ── */}
      <div className="relative z-10 mx-auto mt-6 max-w-screen-xl px-4 text-center sm:mt-10">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 sm:text-sm"
        >
          Software Developer · 1.5+ Year Experience · Pune, India
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-3 text-2xl font-black text-white sm:text-3xl md:text-4xl"
        >
          React.js &nbsp;·&nbsp;Next.js &nbsp;·&nbsp; Node.js &nbsp;·&nbsp; MongoDB &nbsp;·&nbsp; PostgreSQL
        </motion.h2>
      </div>

      {/* ── Stats ── */}
      <div
        ref={statsRef}
        className="relative z-10 mx-auto mt-10 grid max-w-screen-xl grid-cols-2 gap-4 px-4 text-center sm:gap-5 md:grid-cols-4 md:px-8"
      >
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.12 }}
            whileHover={{ scale: 1.06, y: -6, boxShadow: "0 0 30px rgba(0,240,255,0.2)" }}
            className="rounded-2xl border border-white/8 bg-[#0e0e1c] p-5 shadow-md transition hover:border-cyan-300/35 sm:p-6"
          >
            <h3 className="text-2xl font-black text-cyan-400 sm:text-3xl">
              {statsInView && (
                <CountUp
                  start={0}
                  end={item.count}
                  decimals={Number.isInteger(item.count) ? 0 : 1}
                  duration={2.2}
                  suffix={item.suffix}
                />
              )}
            </h3>
            <p className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* bottom spacing */}
      <div className="h-16" />
    </div>
  );
}
