import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import emailjs from "emailjs-com";

const contactLinks = [
  {
    icon: <FiMail />,
    label: "Email",
    value: "nageshmane400@gmail.com",
    href: "mailto:nageshmane400@gmail.com",
    color: "text-cyan-300",
    bg: "bg-cyan-300/10",
  },
  {
    icon: <FiPhone />,
    label: "Phone",
    value: "+91-9623699284",
    href: "tel:+919623699284",
    color: "text-emerald-300",
    bg: "bg-emerald-300/10",
  },
  {
    icon: <FiLinkedin />,
    label: "LinkedIn",
    value: "Connect professionally",
    href: "https://linkedin.com/in/nageshmane/",
    color: "text-sky-300",
    bg: "bg-sky-300/10",
  },
  {
    icon: <FiGithub />,
    label: "GitHub",
    value: "github.com/nagesh5454",
    href: "https://github.com/nagesh5454",
    color: "text-slate-200",
    bg: "bg-white/8",
  },
  {
    icon: <FiMapPin />,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: null,
    color: "text-rose-300",
    bg: "bg-rose-300/10",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [tooltip, setTooltip] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const showTooltip = (msg, type) => {
    setTooltip({ msg, type });
    setTimeout(() => setTooltip(null), 3500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .send("service_047n2tj", "template_gh8mkea", formData, "IYEGKtO5QQu6w-khR")
      .then(() => {
        showTooltip("Message sent successfully! I'll get back to you soon.", "success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error(err);
        showTooltip("Failed to send. Please try again or email directly.", "error");
      })
      .finally(() => setSending(false));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a14] px-4 pb-20 pt-28 text-white sm:px-6 md:px-10 lg:px-16">
      {/* bg grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none absolute inset-x-0 top-[88px] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* ambient orbs */}
      <motion.div
        animate={{ y: [0, -22, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="pointer-events-none absolute -right-20 bottom-32 h-60 w-60 rounded-full bg-purple-500/8 blur-3xl"
      />

      {/* toast */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            className={`fixed left-1/2 top-24 z-[60] w-[min(92vw,400px)] -translate-x-1/2 rounded-2xl border px-5 py-3 text-center text-sm font-semibold shadow-2xl backdrop-blur ${
              tooltip.type === "success"
                ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-100"
                : "border-rose-300/30 bg-rose-400/15 text-rose-100"
            }`}
          >
            {tooltip.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
        {/* ── Left ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="space-y-7"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">
              Contact
            </p>
            <h1 className="text-2xl font-black leading-tight sm:text-3xl lg:text-4xl xl:text-5xl">
              Let&apos;s connect about full-stack development.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              I am open to full-stack developer roles, MERN stack opportunities, React frontend
              work, backend API development, and professional collaboration around production web
              applications.
            </p>
          </div>

          {/* contact cards */}
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {contactLinks.map((item, i) => {
              const inner = (
                <>
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${item.bg} text-lg ${item.color} sm:h-11 sm:w-11`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white sm:text-sm">{item.label}</p>
                    <p className="truncate text-xs text-slate-400 sm:text-sm">{item.value}</p>
                  </div>
                </>
              );

              return item.href ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 35px rgba(0,240,255,0.1)" }}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur transition hover:border-cyan-300/28 sm:gap-4 sm:p-4"
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur sm:gap-4 sm:p-4"
                >
                  {inner}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Right — form ── */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="rounded-2xl border border-cyan-300/12 bg-[#0e0e1c]/70 p-5 shadow-[0_24px_90px_rgba(8,145,178,0.12)] backdrop-blur sm:rounded-3xl sm:p-7 md:p-8"
        >
          <h2 className="mb-5 text-lg font-black text-white sm:mb-6 sm:text-xl">Send a message</h2>

          <div className="space-y-4 sm:space-y-5">
            {[
              { field: "name",  type: "text",  placeholder: "Your full name" },
              { field: "email", type: "email", placeholder: "you@example.com" },
            ].map(({ field, type, placeholder }) => (
              <label key={field} className="block">
                <span className="mb-1.5 block text-xs font-semibold capitalize text-slate-400 sm:mb-2 sm:text-sm">
                  {field}
                </span>
                <input
                  name={field}
                  type={type}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-white/8 bg-white/[0.04] px-4 py-2.5 text-sm text-cyan-50 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-white/[0.07] sm:rounded-2xl sm:py-3 sm:text-base"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-400 sm:mb-2 sm:text-sm">
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about the role, opportunity, or project..."
                className="w-full resize-none rounded-xl border border-white/8 bg-white/[0.04] px-4 py-2.5 text-sm text-cyan-50 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-white/[0.07] sm:rounded-2xl sm:py-3 sm:text-base"
              />
            </label>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={!sending ? { y: -3, scale: 1.01, boxShadow: "0 0 30px rgba(0,240,255,0.35)" } : {}}
              whileTap={!sending ? { scale: 0.97 } : {}}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 shadow-[0_12px_35px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300 disabled:opacity-60 sm:rounded-2xl sm:text-base"
            >
              {sending ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent"
                />
              ) : (
                <FiSend />
              )}
              {sending ? "Sending…" : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
