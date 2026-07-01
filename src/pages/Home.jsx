import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Loader2,
  Mail,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import {
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";


const navItems = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const techStack = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "CI/CD", icon: SiGithubactions, color: "#2088FF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const projects = [
  {
    title: "Job Market",
    image: "/Job-market.jpg",
    description: "A web application that allows users to search for jobs and apply for them.",
    tags: ["Web App", "UI/UX", "Performance"],
  },
  {
    title: "NDRRMO Content Management System",
    image: "/NDRRMO.jpg",
    description: "A content management system for NDRRMO.",
    tags: ["Dashboard", "API", "CMS"],
  },
  {
    title: "Aurora",
    image: "/aurora1.png",
    description: "Aurora is your integrated academic mood-mapping mobile application built using React Native and Expo. It's designed to help students track, visualize, and reflect on their emotional well-being over time.",
    tags: ["React Native", "Firebase", "Expo", "UI/UX"],
  }
];

const achievements = [
  {
    title: "1st Naga City Mayoral Hackathon 2026",
    type: "Competition",
    date: "March 2025",
    image: "/hackathon.jpg",
    description:
      "Built a rapid response reporting web app ",
    contribution:
      "Led the frontend implementation, built reusable UI sections, and integrated API responses into a clean dashboard flow.",
    result: "CHOSEN 15 Semi-Finalist",
  },
  // {
  //   title: "University Tech Challenge",
  //   type: "Competition",
  //   date: "2024",
  //   image: "/vj.jpg",
  //   description:
  //     "Designed and delivered a project prototype under time pressure for judges and technical mentors.",
  //   contribution:
  //     "Owned the presentation-ready interface, improved responsiveness, and translated team ideas into production-ready screens.",
  //   result: "Best UI/UX Award",
  // },
];

const experiences = [
  {
    role: "Full Stack Developer",
    type: "Internship",
    company: "Pixzel Digital",
    period: "2024 - Present",
    details: "Developed and maintained an applications using Laravel, PHP, React, Next.js, and Tailwind CSS.",
  },
];

const sectionAnimation = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ---------------------------------------------------------------------------
// EmailJS credentials — fill these in after creating your EmailJS account.
// Sign up at https://www.emailjs.com/ (free, 200 emails/month)
// Dashboard → Email Services → Add Service → copy Service ID
// Dashboard → Email Templates → Create Template → copy Template ID
// Dashboard → Account → copy Public Key
// ---------------------------------------------------------------------------
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { scrollY } = useScroll();

  // Contact form state
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(/** @type {'idle'|'sending'|'success'|'error'} */ ("idle"));
  const formRef = useRef(null);
  const glowParticles = [
    { width: 220, height: 220, top: "8%", left: "6%", delay: 0 },
    { width: 160, height: 160, top: "28%", left: "78%", delay: 0.8 },
    { width: 190, height: 190, top: "64%", left: "12%", delay: 1.4 },
    { width: 140, height: 140, top: "74%", left: "72%", delay: 2.1 },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const sectionElements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);
    const visibilityMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        const mostVisibleSection = [...visibilityMap.entries()]
          .sort((a, b) => b[1] - a[1])[0]?.[0];

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        // Keeps section activation aligned with visible content under fixed header.
        rootMargin: "-26% 0px -56% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
      }
    );

    sectionElements.forEach((sectionEl) => observer.observe(sectionEl));

    return () => {
      observer.disconnect();
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 12);

    if (latest + window.innerHeight >= document.documentElement.scrollHeight - 12) {
      setActiveSection("contact");
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const sectionId = href.replace("#", "");
    const sectionEl = document.getElementById(sectionId);
    if (!sectionEl) return;

    // Keep section title visible below fixed header when navigating.
    const headerOffset = 150;
    const targetTop = sectionEl.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    setActiveSection(sectionId);
  };

  /** @param {React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>} e */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /** @param {React.FormEvent} e */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // Keys must match the {{variables}} used in your EmailJS template
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  const closeContact = () => {
    setContactOpen(false);
    // Reset status after modal closes so it's fresh next time
    setTimeout(() => setFormStatus("idle"), 300);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,hsla(36,90%,55%,0.26),transparent_38%),radial-gradient(circle_at_86%_14%,hsla(260,95%,65%,0.2),transparent_36%),radial-gradient(circle_at_50%_92%,hsla(190,95%,55%,0.15),transparent_42%)] dark:bg-[radial-gradient(circle_at_10%_8%,hsla(36,90%,55%,0.2),transparent_40%),radial-gradient(circle_at_86%_14%,hsla(260,95%,65%,0.17),transparent_38%),radial-gradient(circle_at_50%_92%,hsla(190,95%,55%,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.22)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.22)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(circle_at_center,black_52%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {glowParticles.map((particle) => (
          <motion.span
            key={`${particle.top}-${particle.left}`}
            initial={{ opacity: 0.15, y: 0, scale: 0.9 }}
            animate={{ opacity: [0.12, 0.32, 0.12], y: [0, -24, 0], scale: [0.9, 1.05, 0.9] }}
            transition={{
              duration: 7.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: particle.delay,
            }}
            className="absolute rounded-full bg-white/30 blur-3xl dark:bg-white/20"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: particle.top,
              left: particle.left,
            }}
          />
        ))}
      </div>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: hasScrolled ? "min(94%, 70rem)" : "min(96%, 72rem)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed left-1/2 top-3 z-50 -translate-x-1/2 rounded-2xl border supports-[backdrop-filter]:bg-background/28 supports-[backdrop-filter]:backdrop-blur-2xl supports-[backdrop-filter]:backdrop-saturate-150 ${hasScrolled
          ? "border-white/20 bg-background/72 shadow-[0_16px_40px_-28px_hsla(220,40%,5%,0.88)]"
          : "border-white/15 bg-background/55 shadow-[0_16px_40px_-28px_hsla(220,40%,5%,0.75)]"
          }`}
      >
        <div className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <a
            href="#hero"
            className="text-lg font-black tracking-[0.2em] text-foreground drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)] sm:text-xl"
          >
            VEEGESTABLE
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${activeSection === item.href.replace("#", "")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {activeSection === item.href.replace("#", "") && (
                  <>
                    <motion.span
                      layoutId="active-section-pill-glow"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      className="absolute -inset-1 rounded-full bg-primary/12 blur-md"
                    />
                    <motion.span
                      layoutId="active-section-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-full border border-white/12 bg-gradient-to-r from-white/12 via-white/7 to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                    />
                  </>
                )}
                <span
                  className={`relative z-10 ${activeSection === item.href.replace("#", "") ? "font-medium" : ""
                    }`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/60 text-foreground transition hover:scale-105 hover:bg-card"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/60 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

      </motion.header>

      <motion.div
        aria-hidden="true"
        animate={{ opacity: hasScrolled ? 1 : 0.85 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-36 bg-gradient-to-b from-background/95 via-background/70 to-transparent"
      />

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/35 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center bg-transparent p-8 backdrop-blur-2xl"
          >
            <div className="flex w-full max-w-xs flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    handleNavClick(event, item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-3 text-center text-xl font-medium transition ${activeSection === item.href.replace("#", "")
                    ? "bg-white/30 text-foreground dark:bg-white/15"
                    : "text-foreground/90 hover:bg-white/30 dark:hover:bg-white/10"
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <main className="mx-auto grid w-full max-w-6xl gap-y-6 px-6 pb-20 pt-24">
        <section id="hero" className="flex min-h-[85vh] items-center py-16 scroll-mt-36 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 grid w-full items-start gap-10 md:grid-cols-[1.35fr_1fr]"
          >
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles size={14} />
                Available for freelance work
              </span>
              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Hi, I'm VJ. I design and build digital experiences clients remember.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I partner with teams and founders who need end-to-end web products not just
                screens, but flows that work in production. From React and Next.js frontends
                to Laravel and Node backends, I ship fast, accessible interfaces backed by
                solid APIs and cloud-ready infrastructure so you launch sooner, onboard users
                smoothly, and keep shipping without rework.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
                >
                  See My Work <ArrowUpRight size={15} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-2.5 text-sm font-semibold transition hover:border-primary/50"
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div
              className="relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-white/25 bg-cover bg-[center_70%] p-6"
              style={{ backgroundImage: "url('/vj1.jpg')" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/45" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(0,0,0,0.46),transparent_48%)]" />

              <div className="relative flex items-start">
                <div className="space-y-3 pt-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">At a glance</p>
                  <p className="text-4xl font-bold leading-none text-white">3+ Years</p>
                  <p className="max-w-[16rem] text-sm leading-relaxed text-white/80">
                    Experience building modern web products that drive results.
                  </p>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-4">
                <div className="rounded-lg bg-black/30 px-3 py-2.5 backdrop-blur-[1px]">
                  <p className="text-lg font-semibold text-white">5+</p>
                  <p className="text-xs text-white/75">Projects</p>
                </div>

              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          id="about"
          variants={sectionAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="py-14 scroll-mt-36"
        >
          <div className="mb-6 flex items-center gap-3">
            <UserRound className="text-primary" size={20} />
            <h2 className="text-2xl font-bold md:text-3xl">About Me</h2>
          </div>
          <div className="grid gap-4 rounded-2xl border border-border/70 bg-card/60 p-7 md:grid-cols-3 md:p-8">
            <div className="rounded-xl border border-border/70 bg-background/65 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Focus</p>
              <p className="mt-2 text-sm font-medium">UI/UX + Backend Development</p>
            </div>
            <p className="text-muted-foreground leading-relaxed md:col-span-2 md:text-lg">
              I’m an aspiring full stack developer who enjoys creating web applications from the ground up, designing interfaces, building APIs, and connecting everything together. I like solving problems and turning complex ideas into simple, usable systems. As I continue learning, I focus on improving code quality, understanding how systems scale, and building projects that have real impact.
            </p>
          </div>
        </motion.section>

        <motion.section
          id="techstack"
          variants={sectionAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="py-14 scroll-mt-36"
        >
          <div className="mb-6 flex items-center gap-3">
            <Code2 className="text-primary" size={20} />
            <h2 className="text-2xl font-bold md:text-3xl">Tech Stack</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 rounded-xl border border-border/70 bg-card/70 p-4 text-sm font-medium"
                >
                  <Icon color={tech.color} size={18} />
                  <span>{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          variants={sectionAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-14 scroll-mt-36"
        >
          <div className="mb-6 flex items-center gap-3">
            <Sparkles className="text-primary" size={20} />
            <h2 className="text-2xl font-bold md:text-3xl">Recent Projects</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card/65"
              >
                <div className="relative h-44 w-full overflow-hidden border-b border-border/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = "/vj1.jpg";
                    }}
                  />
                </div>
                <div className="flex flex-col justify-between p-5">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background/75 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="achievements"
          variants={sectionAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-14 scroll-mt-36"
        >
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="text-primary" size={20} />
            <h2 className="text-2xl font-bold md:text-3xl">Achievements</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {achievements.map((achievement) => (
              <motion.article
                key={achievement.title}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card/65"
              >
                <div className="relative h-48 w-full overflow-hidden border-b border-border/60">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-primary">
                      {achievement.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{achievement.date}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{achievement.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/55 p-3">
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      My contribution
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">{achievement.contribution}</p>
                  </div>
                  <p className="text-sm font-medium text-primary">{achievement.result}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          variants={sectionAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="py-14 scroll-mt-36"
        >
          <div className="mb-6 flex items-center gap-3">
            <BriefcaseBusiness className="text-primary" size={20} />
            <h2 className="text-2xl font-bold md:text-3xl">Experience</h2>
          </div>
          <div className="relative ml-2 space-y-8 border-l border-border/80 pl-7 md:ml-4 md:pl-9">
            {experiences.map((item, index) => (
              <motion.div
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative rounded-2xl border border-border/70 bg-card/70 p-6"
              >
                <span className="absolute -left-7 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_0_6px_hsl(var(--background))] md:-left-9" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{item.role} - {item.type}</h3>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                    {item.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          variants={sectionAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="py-14 scroll-mt-36"
        >
          <div className="mb-6 flex items-center gap-3">
            <Mail className="text-primary" size={20} />
            <h2 className="text-2xl font-bold md:text-3xl">Contact</h2>
          </div>
          <div className="grid gap-5 rounded-2xl border border-border/70 bg-card/60 p-7 md:grid-cols-[1.2fr_auto] md:items-center md:p-8">
            <p className="max-w-2xl text-muted-foreground leading-relaxed">
              I'm Veejay if you have a scope outline, a launch date, or a web problem you want
              off your plate, I'd like to hear it. Tap the mail button to send a message; I
              take on freelance and contract work and usually reply to new project leads within
              one to two business days.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <button
                type="button"
                id="open-contact-form"
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:scale-[1.03]"
              >
                <Mail size={15} />
                Send Me a Message
              </button>
              <a
                href="#hero"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-2.5 text-sm font-semibold transition hover:border-primary/50"
              >
                Back to Top
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* ── Contact Form Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {contactOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="contact-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={closeContact}
              aria-hidden="true"
            />

            {/* Modal panel */}
            <motion.div
              key="contact-modal"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-lg -translate-y-1/2 rounded-2xl border border-white/15 bg-card/90 p-7 shadow-2xl backdrop-blur-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:p-8"
            >
              {/* Header */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 id="contact-modal-title" className="text-xl font-bold">
                    Let's work together
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Fill in the details below and I'll get back to you within 1–2 business days.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeContact}
                  aria-label="Close contact form"
                  className="mt-0.5 rounded-full p-1.5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Success state */}
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <div className="rounded-full bg-green-500/15 p-4">
                    <CheckCircle2 className="text-green-500" size={36} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Message sent!</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Thanks for reaching out. I'll reply to your email soon.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeContact}
                    className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-border/70 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-border/70 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project — scope, timeline, budget range..."
                      className="w-full resize-none rounded-xl border border-border/70 bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                      Something went wrong. Please try again or email me directly at{" "}
                      <a href="mailto:viovicenteveejay@email.com" className="underline">
                        viovicenteveejay@email.com
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}