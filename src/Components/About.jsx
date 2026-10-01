import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiBriefcase, FiCode, FiDatabase, FiShield,
  FiCalendar, FiMapPin, FiUser, FiGlobe,
} from "react-icons/fi";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

/* ── data ── */
const strengths = [
  {
    icon: <FiCode />,
    title: "Frontend",
    text: "React.js, Next.js, Redux Toolkit, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, and Bootstrap for responsive interfaces.",
    color: "text-cyan-300",
    bg: "bg-cyan-300/10",
    border: "border-cyan-300/15",
  },
  {
    icon: <FiDatabase />,
    title: "Backend & Database",
    text: "Node.js, Express.js, Nest.js, REST APIs, MongoDB, PostgreSQL, MySQL, Prisma, and SQL.",
    color: "text-emerald-300",
    bg: "bg-emerald-300/10",
    border: "border-emerald-300/15",
  },
  {
    icon: <FiShield />,
    title: "Auth & Security",
    text: "Docker, Git, GitHub, Postman, VS Code, IntelliJ IDEA, and Figma; experienced with authentication and API integration.",
    color: "text-purple-300",
    bg: "bg-purple-300/10",
    border: "border-purple-300/15",
  },
];

const experience = [
  {
    company: "Senwell Group",
    role: "Software Developer",
    duration: "Sep 2025 – Present",
    period: "Current",
    project: "Healthcare & US-based e-commerce",
    location: "Pune, India",
    type: "Healthcare & US-Based E-commerce Platforms",
    summary:
      "Worked on healthcare and US-based e-commerce platforms, owning end-to-end delivery of production features from React.js and Redux Toolkit UI implementation through Node.js and Express API design.",
    points: [
      "Designed REST APIs in Node.js and Express with validation, authentication, and backend service integration.",
      "Built reusable, responsive React.js and Tailwind CSS components across product modules.",
      "Worked with a cross-functional team using Git branches, pull requests, and code review.",
      "Delivered assigned modules within sprint timelines.",
    ],
    accent: "cyan",
  },
  {
    company: "SiliconMount Tech Services Pvt. Ltd.",
    role: "Software Developer Intern",
    duration: "Jan 2025 – Jul 2025",
    period: "7 Months",
    project: "Frontend and API integration",
    location: "Pune, India",
    type: "Frontend Development & API Integration",
    summary:
      "Built responsive React.js and Tailwind CSS components integrated with REST APIs to display dynamic, real-time data.",
    points: [
      "Collaborated with senior developers to debug UI issues and improve component performance.",
      "Reviewed pull requests and contributed to internal documentation.",
      "Delivered UI features on schedule across multiple sprints.",
      "Gained experience across the frontend-to-API integration lifecycle.",
    ],
    accent: "purple",
  },
];

const personalAttributes = [
  { icon: <FiMapPin />, label: "Location", value: "Pune, Maharashtra" },
  { icon: <FiCalendar />, label: "B.Tech · Information Technology", value: "Dr. Babasaheb Ambedkar Technological University · Aug 2021 – Jul 2025" },
  { icon: <FiUser />, label: "B.Tech Result", value: "CGPA: 7.87 / 10 · Raigad, Maharashtra" },
  { icon: <FiCalendar />, label: "12th Standard · Science", value: "Mahatma Gandhi Junior College of Science · Jun 2020 – Mar 2021" },
  { icon: <FiUser />, label: "12th Result", value: "93.33% · Karmala, Solapur" },
  { icon: <FiCode />, label: "Coding Profiles", value: "200+ GeeksforGeeks · 100+ LeetCode" },
  { icon: <FiGlobe />, label: "Certifications", value: "DSA in Java (Apna College) · Front-End Web Dev (Coursera) · MERN Stack (PhysicsWallah) · Full Stack Web Dev (Internshala)" },
  { icon: <FiCode />, label: "Relevant Coursework", value: "OOP · DBMS · Operating Systems · Computer Networks · Software Engineering" },
];

const accentMap = {
  cyan: {
    border: "border-cyan-300/20",
    glow: "hover:shadow-[0_0_45px_rgba(0,240,255,0.12)]",
    dot: "bg-cyan-400",
    badge: "bg-cyan-300/10 text-cyan-200 border-cyan-300/20",
    label: "text-cyan-300",
  },
  purple: {
    border: "border-purple-300/20",
    glow: "hover:shadow-[0_0_45px_rgba(168,85,247,0.12)]",
    dot: "bg-purple-400",
    badge: "bg-purple-300/10 text-purple-200 border-purple-300/20",
    label: "text-purple-300",
  },
};

/* ── sub-components ── */
function ExperienceCard({ item, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const a = accentMap[item.accent];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-3xl border ${a.border} bg-[#0e0e1c]/90 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur transition sm:p-7 ${a.glow}`}
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-white/[0.02]" />

      {/* badges */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${a.badge}`}>
          {item.duration}
        </span>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${a.badge}`}>
          {item.period}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <FiMapPin size={10} /> {item.location}
        </span>
      </div>

      <h3 className="text-xl font-black text-white sm:text-2xl">{item.company}</h3>
      <p className="mt-1 text-sm font-semibold text-slate-300 sm:text-base">{item.role}</p>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-widest ${a.label}`}>{item.type}</p>

      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
        <span className="font-bold text-cyan-200">Project: {item.project}. </span>
        {item.summary}
      </p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-3">
        {item.points.map((point, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.07 }}
            className="flex gap-3 text-sm leading-7 text-slate-300"
          >
            <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${a.dot}`} />
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

/* ── main component ── */
export default function AboutMe() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [attrRef, attrInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a14] px-4 pb-20 pt-28 text-white sm:px-6 md:px-10 lg:px-16">
      {/* bg grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* ambient orbs */}
      <motion.div
        animate={{ y: [0, -24, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-40 h-80 w-80 rounded-full bg-cyan-500/8 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="pointer-events-none absolute -right-24 bottom-40 h-64 w-64 rounded-full bg-purple-500/8 blur-3xl"
      />

      <motion.section
        ref={heroRef}
        variants={stagger}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl"
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} className="max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
            About Me
          </p>
          <h1 className="text-2xl font-black leading-tight sm:text-3xl lg:text-4xl xl:text-5xl">
            Software Developer with{" "}
            <span className="text-cyan-400">1.5+ year</span> of experience building
            full-stack web applications.
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            My name is <span className="font-bold text-cyan-200">Nagesh Mane</span>. I build
            full-stack applications with the MERN stack and have working exposure to Next.js,
            Nest.js, PostgreSQL, Docker, and Prisma. I have solved 250+ DSA problems across
            LeetCode and GeeksforGeeks, and I enjoy taking features from UI implementation through API design.
          </p>
        </motion.div>

        {/* ── Info pills ── */}
        <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2 sm:gap-3">
          {[
            { icon: <FiMapPin size={12} />, text: "Pune, India" },
            { icon: <FiCalendar size={12} />, text: "1.5+ Year Experience" },
            { icon: <FiBriefcase size={12} />, text: "2 Companies" },
          ].map((pill) => (
            <span
              key={pill.text}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="text-cyan-300">{pill.icon}</span>
              {pill.text}
            </span>
          ))}
        </motion.div>

        {/* ── Strength cards ── */}
        <motion.div variants={stagger} className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
          {strengths.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,240,255,0.08)" }}
              className={`rounded-2xl border ${card.border} bg-white/[0.035] p-5 backdrop-blur transition sm:p-6`}
            >
              <div className={`mb-4 grid h-11 w-11 place-items-center rounded-xl ${card.bg} text-xl ${card.color}`}>
                {card.icon}
              </div>
              <h2 className="text-base font-bold text-white sm:text-lg">{card.title}</h2>
              <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">{card.text}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* ── Experience ── */}
        <section className="mt-14">
          <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-3">
            <FiBriefcase className="text-2xl text-cyan-300" />
            <h2 className="text-xl font-black text-white sm:text-2xl">Work Experience</h2>
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              1.5+ Year
            </span>
          </motion.div>

          <div className="space-y-5 sm:space-y-6">
            {experience.map((item, index) => (
              <ExperienceCard key={item.company} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* ── Personal Attributes ── */}
        <motion.section
          ref={attrRef}
          initial={{ opacity: 0, y: 40 }}
          animate={attrInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-14"
        >
          <div className="mb-6 flex items-center gap-3">
            <FiUser className="text-2xl text-cyan-300" />
            <h2 className="text-xl font-black text-white sm:text-2xl">Education &amp; Profiles</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {personalAttributes.map((attr, i) => (
              <motion.div
                key={attr.label}
                initial={{ opacity: 0, y: 20 }}
                animate={attrInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,240,255,0.1)" }}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.035] p-4 backdrop-blur transition hover:border-cyan-300/25 sm:p-5"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-lg text-cyan-300">
                  {attr.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{attr.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-white sm:text-base">{attr.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.section>
    </main>
  );
}
