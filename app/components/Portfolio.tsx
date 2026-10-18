"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Project = {
  id: number;
  title: string;
  tag: string;
  description: string;
  link?: string;
  imageUrl: string;
  color: string;
};

type Skill = {
  name: string;
  level: number; // 1-5
};

// ─── Data ────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    title: "Coaching Academy",
    tag: "Test Task",
    description:
      "Portfolio catalog website using HTML, CSS, JavaScript, and Tailwind. Clean modern interface, responsive layout, fast loading performance.",
    link: "https://traineranagency.netlify.app/",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1777994567/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-04_213630_x6mi4r.png",
    color: "#FF6B35",
  },
  {
    id: 2,
    title: "Lén skin store",
    link: "https://www.lenskinstore.ca/",
    tag: "Freelance",
    description:
      "Skincare e-commerce website built with Next.js and Firebase, featuring a modern UI, product catalog, and seamless shopping experience across all devices.",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1792317114/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-10-18_115057_qzzhan.png",
    color: "#f9bfca",
  },

  {
    id: 3,
    title: "Sweet-berry Seedlings Site",
    tag: "Freelance + Collaboration",
    description:
      "Sweet-berry Seedlings Site was built in collaboration with Mykhailo Zhuk website using Next.js, Tailwind, and smooth animations. Engaging UX, fast performance across all devices.",
    link: "https://www.sweet-berry-seedlings.com/",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1778001908/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-05_191014_dart4b.png",
    color: "#F59E0B",
  },
  {
    id: 4,
    title: "Christmas Lights",
    tag: "Freelance",
    description:
      "Christmas lights installation services website using Next.js, Tailwind, and smooth animations. Engaging UX, fast performance across all devices.",
    link: "https://christmaslightsinstallersskyshineca.vercel.app/",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1777994560/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-04_213719_euibfb.png",
    color: "#F59E0B",
  },
  {
    id: 5,
    title: "ZOO Shop",
    tag: "Test Task",
    description:
      "Veterinary clinic website using HTML, CSS, JavaScript, and Tailwind. Modern responsive design, clear structure, user-friendly navigation.",
    link: "https://zoodf.netlify.app/",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1777994560/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-04_213657_keot42.png",
    color: "#4ECDC4",
  },
  {
    id: 6,
    title: "Travel Booking",
    tag: "Personal",
    description:
      "Travel-themed website using HTML, CSS, JavaScript, and Tailwind. Modern responsive design, user-friendly navigation, well-structured content.",
    link: "https://travelkitsunewebsite.netlify.app/",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1777994563/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-04_214242_u78kxl.png",
    color: "#A78BFA",
  },

  {
    id: 7,
    title: "CRYPTOCURRENCY EXCHANGE",
    tag: "Personal",
    description:
      "CRYPTOCURRENCY EXCHANGE website using HTML, CSS, JavaScript, and Tailwind. Modern responsive design, user-friendly navigation, well-structured content..",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1777994560/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-04_214039_vp69wz.png",
    color: "#e5d9d9",
  },
  {
    id: 8,
    title: "Raccoon Recipe",
    tag: "Personal",
    link: "https://raccoonrecipe.netlify.app/#",
    description:
      "Raccoon Recipe website using HTML, CSS, JavaScript, and Tailwind. Modern responsive design, user-friendly navigation, well-structured content..",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1778000361/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-05_185905_nquxkd.png",
    color: "#F59E0B",
  },
  {
    id: 9,
    title: "Ave-Maria Pilgrimage Centre ",
    tag: "Freelance",
    description:
      "Ave-Maria Pilgrimage Centre website using Next.js, Tailwind, and smooth animations. Engaging UX, fast performance across all devices.",
    link: "https://avemaria.place/",
    imageUrl:
      "https://res.cloudinary.com/ddtq1ioty/image/upload/v1777994561/%D0%97%D0%BD%D1%96%D0%BC%D0%BE%D0%BA_%D0%B5%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2026-05-04_213737_babphv.png",
    color: "#DF0E62",
  },

];

const skills: Skill[] = [
  { name: "React / Next.js", level: 5 },
  { name: "TypeScript", level: 4 },
  { name: "Tailwind CSS", level: 5 },
  { name: "Framer Motion", level: 4 },
  { name: "HTML / CSS", level: 5 },
  { name: "JavaScript", level: 4 },
];

const navItems = ["About", "Projects", "Skills", "Contact"];

// ─── Nav ─────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ backdropFilter: "blur(16px)", background: "rgba(10,10,10,0.6)" }}
    >
      <span
        className="font-black text-xl tracking-tighter cursor-pointer"
        style={{ color: "#FF6B35", fontFamily: "'Clash Display', sans-serif" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        DEV.
      </span>

      {/* Desktop */}
      <ul className="hidden md:flex gap-8">
        {navItems.map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollTo(item)}
              className="text-sm tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* Hire me CTA */}
      <a
        href="mailto:shunmarian2@gmail.com"
        className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all"
        style={{ background: "#FF6B35", color: "#fff" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#e8572a")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#FF6B35")}
      >
        Hire me ↗
      </a>

      {/* Mobile burger */}
      <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
        <span className="text-2xl">{open ? "✕" : "☰"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 flex flex-col items-center gap-6 py-8"
            style={{ background: "rgba(10,10,10,0.95)" }}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-lg tracking-widest uppercase text-white/70 hover:text-white"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const words = ["Front-End", "Developer", "&", "Creative", "Builder"];

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6"
      style={{ background: "#0A0A0A" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "#FF6B35" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "#A78BFA" }}
      />

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 text-xs tracking-widest uppercase mb-8 px-4 py-2 rounded-full border"
        style={{ borderColor: "rgba(255,255,255,0.12)", color: "#4ECDC4" }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#4ECDC4" }}
        />
        Available for work
      </motion.div>

      {/* Animated heading */}
      <h1
        className="text-6xl md:text-8xl font-black leading-none mb-6"
        style={{ fontFamily: "'Clash Display', sans-serif", color: "#fff" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.1,
              ease: "easeOut",
            }}
            className="inline-block mr-4"
            style={word === "&" ? { color: "#FF6B35" } : {}}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="max-w-xl text-base md:text-lg leading-relaxed mb-10"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        2 years of freelance experience building modern, fast, and responsive
        web applications. I combine React, Next.js, and Framer with a strong
        sense of design to craft intuitive user experiences.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <button
          onClick={() =>
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-3 rounded-full font-semibold text-sm transition-all"
          style={{ background: "#FF6B35", color: "#fff" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.04)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          View my work
        </button>
        <a
          href="mailto:shunmarian2@gmail.com"
          className="px-8 py-3 rounded-full font-semibold text-sm border transition-all"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FF6B35")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
          }
        >
          Contact me
        </a>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl"
      style={{ background: "#141414" }}
    >
      {/* Image with parallax */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          style={{ y }}
          src={project.imageUrl}
          alt={`Screenshot of ${project.title}`}
          className="w-full h-[120%] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `linear-gradient(to top, #141414, transparent)`,
          }}
        />
        {/* Tag pill */}
        <span
          className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: project.color + "33",
            color: project.color,
            border: `1px solid ${project.color}55`,
          }}
        >
          {project.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-bold mb-2"
          style={{ color: "#fff", fontFamily: "'Clash Display', sans-serif" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {project.description}
        </p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
            style={{ color: project.color }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
          >
            View live ↗
          </a>
        )}
      </div>

      {/* Accent line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
        style={{ background: project.color }}
      />
    </motion.article>
  );
};

// ─── Projects Section ─────────────────────────────────────────────────────────

const Projects = () => (
  <section
    id="projects"
    className="py-32 px-6 md:px-16"
    style={{ background: "#0A0A0A" }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span
          className="text-xs tracking-widest uppercase mb-3 block"
          style={{ color: "#FF6B35" }}
        >
          Selected work
        </span>
        <h2
          className="text-5xl md:text-7xl font-black"
          style={{ color: "#fff", fontFamily: "'Clash Display', sans-serif" }}
        >
          Projects.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ─── Skills Section ───────────────────────────────────────────────────────────

const Skills = () => (
  <section
    id="skills"
    className="py-32 px-6 md:px-16"
    style={{ background: "#0D0D0D" }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span
          className="text-xs tracking-widest uppercase mb-3 block"
          style={{ color: "#4ECDC4" }}
        >
          What I work with
        </span>
        <h2
          className="text-5xl md:text-7xl font-black"
          style={{ color: "#fff", fontFamily: "'Clash Display', sans-serif" }}
        >
          Skills.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold" style={{ color: "#fff" }}>
                {skill.name}
              </span>
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {"★".repeat(skill.level)}
                {"☆".repeat(5 - skill.level)}
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: "#4ECDC4" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
        {[
          { value: "2+", label: "Years experience" },
          { value: "10+", label: "Projects delivered" },
          { value: "5★", label: "Client satisfaction" },
          { value: "∞", label: "Lines of code" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl border"
            style={{
              background: "#141414",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="text-4xl font-black mb-1"
              style={{
                color: "#FF6B35",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {stat.value}
            </div>
            <div
              className="text-xs tracking-wide uppercase"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Contact Section ──────────────────────────────────────────────────────────

const Contact = () => (
  <section
    id="contact"
    className="py-40 px-6 text-center relative overflow-hidden"
    style={{ background: "#0A0A0A" }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,53,0.12) 0%, transparent 70%)",
      }}
    />

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl mx-auto relative z-10"
    >
      <span
        className="text-xs tracking-widest uppercase mb-4 block"
        style={{ color: "#FF6B35" }}
      >
        Let's work together
      </span>
      <h2
        className="text-5xl md:text-8xl font-black mb-6"
        style={{
          color: "#fff",
          fontFamily: "'Clash Display', sans-serif",
          lineHeight: 1,
        }}
      >
        Got a project?
      </h2>
      <p
        className="text-base mb-10"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        I'm open to new challenges, long-term collaboration, and meaningful
        projects. Let's build something great together.
      </p>

      <a
        href="mailto:shunmarian2@gmail.com"
        className="inline-flex items-center gap-3 text-lg font-bold px-10 py-4 rounded-full transition-all"
        style={{ background: "#FF6B35", color: "#fff" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#e8572a";
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#FF6B35";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Say hello ↗
      </a>

      <div className="flex justify-center gap-8 mt-14">
        {[
          { label: "GitHub", href: "https://github.com/marishubarna" },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/marianna-shuniaieva-647ab9287/",
          },
          { label: "Telegram", href: "https://t.me/Marishun21" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest uppercase transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.div>

    {/* Footer */}
    <div
      className="mt-24 text-xs tracking-widest uppercase"
      style={{ color: "rgba(255,255,255,0.2)" }}
    >
      © {new Date().getFullYear()} — Built with Next.js & Framer Motion
    </div>
  </section>
);

// ─── Root ─────────────────────────────────────────────────────────────────────

export const Portfolio = () => {
  return (
    <>
      {/*
        Add to your globals.css or _document.tsx:
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,800,900&display=swap');
      */}
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
};

export default Portfolio;
