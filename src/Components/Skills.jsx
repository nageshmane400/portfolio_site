import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBootstrap, FaCss3Alt, FaGitAlt, FaHtml5, FaJsSquare, FaNodeJs, FaReact } from "react-icons/fa";
import { SiDocker, SiExpress, SiJsonwebtokens, SiMysql, SiNextdotjs, SiPostman, SiTailwindcss } from "react-icons/si";
import { TbSparkles } from "react-icons/tb";

/* ── data from resume ── */
const skillGroups = [
  {
    title: "Languages & Frontend",
    summary: "Responsive interfaces, dashboards, and admin screens.",
    color: "cyan",
    skills: [
      { name: "HTML5",       icon: <FaHtml5 />,      color: "text-orange-400", level: 95 },
      { name: "Java",        icon: <FaJsSquare />,   color: "text-orange-300", level: 80 },
      { name: "CSS3",        icon: <FaCss3Alt />,     color: "text-sky-400",    level: 92 },
      { name: "JavaScript",  icon: <FaJsSquare />,    color: "text-yellow-300", level: 90 },
      { name: "TypeScript", icon: <FaJsSquare />,    color: "text-blue-300",   level: 80 },
      { name: "React.js",    icon: <FaReact />,       color: "text-cyan-300",   level: 92 },
      { name: "Next.js",     icon: <SiNextdotjs />,   color: "text-white",      level: 85 },
      { name: "Tailwind CSS",icon: <SiTailwindcss />, color: "text-teal-300",   level: 93 },
      { name: "Bootstrap",   icon: <FaBootstrap />,   color: "text-indigo-300", level: 80 },
    ],
  },
  {
    title: "Backend & Database",
    summary: "APIs, authentication, CRUD flows, and database-backed modules.",
    color: "emerald",
    skills: [
      { name: "Node.js",    icon: <FaNodeJs />,         color: "text-emerald-400", level: 88 },
      { name: "Express.js", icon: <SiExpress />,         color: "text-slate-200",   level: 87 },
      { name: "Nest.js",    icon: <SiExpress />,         color: "text-rose-300",    level: 75 },
      { name: "MongoDB",    icon: <FaNodeJs />,           color: "text-emerald-300", level: 85 },
      { name: "PostgreSQL", icon: <SiMysql />,            color: "text-sky-300",     level: 78 },
      { name: "Prisma",     icon: <SiExpress />,           color: "text-violet-300",  level: 72 },
      { name: "JWT Auth",   icon: <SiJsonwebtokens />,   color: "text-yellow-200",  level: 85 },
      { name: "SQL / MySQL",icon: <SiMysql />,           color: "text-sky-300",     level: 84 },
    ],
  },
  {
    title: "Tools & Version Control",
    summary: "Version control, API testing, deployment, and delivery workflow.",
    color: "purple",
    skills: [
      { name: "Git",     icon: <FaGitAlt />,   color: "text-red-400",    level: 90 },
      { name: "GitHub",  icon: <FaGitAlt />,   color: "text-slate-100",  level: 90 },
      { name: "Postman", icon: <SiPostman />,  color: "text-orange-300", level: 88 },
      { name: "Docker",  icon: <SiDocker />,   color: "text-sky-300",    level: 72 },
      { name: "VS Code", icon: <FaGitAlt />,   color: "text-blue-300",   level: 90 },
      { name: "IntelliJ IDEA", icon: <FaGitAlt />, color: "text-pink-300", level: 82 },
      { name: "Figma",   icon: <FaGitAlt />,   color: "text-violet-300", level: 75 },
    ],
  },
];

const barGradient = { cyan: "from-cyan-400 to-sky-500", emerald: "from-emerald-400 to-teal-500", purple: "from-purple-400 to-violet-500" };
const cardGlow    = { cyan: "hover:shadow-[0_0_40px_rgba(0,240,255,0.14)]", emerald: "hover:shadow-[0_0_40px_rgba(52,211,153,0.14)]", purple: "hover:shadow-[0_0_40px_rgba(168,85,247,0.14)]" };
const cardBorder  = { cyan: "border-cyan-300/15", emerald: "border-emerald-300/15", purple: "border-purple-300/15" };

/* ── SkillBar ── */
function SkillBar({ name, icon, color, level, barColor, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      whileHover={{ scale: 1.04, x: 4 }}
      className="group relative overflow-hidden rounded-lg border border-white/8 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-3 backdrop-blur-sm transition hover:border-white/20 hover:bg-gradient-to-br hover:from-white/[0.08] hover:to-white/[0.03] sm:rounded-xl sm:p-4"
    >
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <motion.span 
            whileHover={{ rotate: 12, scale: 1.2 }}
            className={`text-lg transition sm:text-xl ${color}`}
          >
            {icon}
          </motion.span>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white sm:text-sm">{name}</span>
        </div>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.8 }}
          className="text-xs font-bold text-cyan-300"
        >
          {level}%
        </motion.span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/6">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.25, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${barColor} shadow-[0_0_20px_rgba(0,240,255,0.3)]`}
        />
      </div>
    </motion.div>
  );
}

/* ── SkillGroupCard ── */
function SkillGroupCard({ group, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const colorMap = { cyan: 'cyan', emerald: 'emerald', purple: 'purple' };
  const accentColors = { 
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-300/20 hover:border-cyan-300/40', 
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-300/20 hover:border-emerald-300/40', 
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-300/20 hover:border-purple-300/40' 
  };
  const iconColors = { cyan: 'text-cyan-400', emerald: 'text-emerald-400', purple: 'text-purple-400' };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${accentColors[group.color]} backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition duration-500 ${cardGlow[group.color]} sm:rounded-3xl`}
    >
      {/* Gradient bg blur */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[group.color].split(' ')[0]} opacity-0 group-hover:opacity-100 transition duration-500`} />
      
      {/* Content */}
      <div className="relative p-5 sm:p-7">
        {/* Header with icon */}
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.15 }}
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-lg sm:h-12 sm:w-12 sm:text-xl ${iconColors[group.color]}`}
          >
            <TbSparkles />
          </motion.div>
          <h3 className="text-lg font-black text-white sm:text-xl">{group.title}</h3>
        </div>
        
        <p className="mb-6 text-xs leading-6 text-slate-300 sm:text-sm sm:leading-7">{group.summary}</p>
        
        <div className="space-y-2 sm:space-y-3">
          {group.skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              {...skill}
              barColor={barGradient[group.color]}
              inView={inView}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ── main ── */
export default function Skills() {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const coreTech = [
    "Java", "JavaScript", "TypeScript", "React.js", "Next.js",
    "Redux Toolkit", "HTML", "CSS", "Tailwind CSS", "Bootstrap",
    "Node.js", "Express.js", "Nest.js", "REST APIs", "MongoDB",
    "PostgreSQL", "MySQL", "Prisma", "Docker", "Git", "GitHub", "Postman",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a14] px-4 pb-24 pt-32 text-white sm:px-6 md:px-10">
      {/* bg grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute inset-x-0 top-[100px] h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* ambient orbs */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-10 top-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl sm:h-96 sm:w-96"
      />
      <motion.div
        animate={{ y: [0, 22, 0], x: [0, -12, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute bottom-32 left-12 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl sm:h-80 sm:w-80"
      />
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="mb-12 text-center sm:mb-16"
        >
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm"
          >
            <TbSparkles size={16} /> Technical Proficiency
          </motion.p>
          <h2 className="bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-3xl font-black tracking-wide text-transparent sm:text-4xl md:text-5xl">
            Full-Stack Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-xs leading-7 text-slate-400 sm:text-sm sm:leading-8">
            Technologies used across full-stack web development, from responsive interfaces to backend APIs, databases, and deployment tools.
          </p>
        </motion.div>

        {/* skill cards */}
        <div className="grid gap-6 sm:gap-7 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillGroupCard key={group.title} group={group} index={index} />
          ))}
        </div>

        {/* core tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/8 to-cyan-500/3 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,240,255,0.08)] sm:mt-16 sm:rounded-3xl sm:p-8"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-1 w-1 rounded-full bg-cyan-300" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Core Technology Stack
            </p>
            <div className="h-1 w-1 rounded-full bg-cyan-300" />
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {coreTech.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={titleInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + idx * 0.04 }}
                whileHover={{ scale: 1.12, y: -4, boxShadow: '0 0 20px rgba(0,240,255,0.3)' }}
                className="cursor-default rounded-full border border-cyan-300/25 bg-gradient-to-r from-cyan-300/10 to-cyan-300/5 px-3.5 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_15px_rgba(0,240,255,0.1)] transition hover:border-cyan-300/50 hover:bg-gradient-to-r hover:from-cyan-300/15 hover:to-cyan-300/8 sm:px-4.5 sm:py-2.5 sm:text-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
