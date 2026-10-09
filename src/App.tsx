import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Brain,
  Cpu,
  Shield,
  Monitor,
  GraduationCap,
  BarChart3,
  Code,
  LineChart,
  Mail,
  ExternalLink,
  ChevronDown,
  Moon,
  Sun,
  Sparkles,
  Target,
  Calendar,
  Award,
  BookOpen,
  Lightbulb,
  Puzzle,
  Gamepad2,
  Rocket,
  Heart,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

// ============================================
// DATA
// ============================================

const RESEARCH_INTERESTS = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Exploring machine learning, neural networks, and intelligent systems that learn and adapt.",
  },
  {
    icon: Cpu,
    title: "Operating Systems",
    description:
      "Understanding system architecture, process management, and low-level computing.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Studying threat analysis, secure systems design, and defensive computing strategies.",
  },
  {
    icon: Monitor,
    title: "Human-Computer Interaction",
    description:
      "Designing intuitive interfaces that bridge technology and human understanding.",
  },
  {
    icon: GraduationCap,
    title: "Educational Technology",
    description:
      "Building tools that make learning more effective, engaging, and accessible.",
  },
  {
    icon: Code,
    title: "Systems Engineering",
    description:
      "Creating robust, scalable systems with thoughtful architecture and design.",
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    description:
      "Transforming complex data into clear, actionable visual insights.",
  },
  {
    icon: LineChart,
    title: "Computational Thinking",
    description:
      "Applying algorithmic approaches to solve complex problems systematically.",
  },
];

const PROJECTS = [
  {
    title: "Smart Study OS - AI Study Planner & Productivity Dashboard",
    category: "AI + Educational Technology",
    description:
      "A study dashboard that helps students plan sessions, stay focused, track goals, and notice when their workload is getting too heavy.",
    features: [
      "Smart timetable generation",
      "Pomodoro timer",
      "Goal tracking",
      "Burnout alerts",
      "Focus score",
      "Productivity analytics",
      "Subject performance charts",
    ],
    techStack: ["React", "Vite", "Tailwind", "Recharts", "Gemini API"],
    impact:
      "Improves learning efficiency through data-driven study optimization.",
    previewUrl: "https://smart-study-os-sigma.vercel.app/",
    githubUrl: "#",
    previewImage: "/assets/SmartStudyOSDashboard.png",
  },
  {
    title: "Schedulix OS - Operating Systems & CPU Scheduling Visualizer",
    category: "Core Computer Science",
    description:
      "A visual lab for watching CPU scheduling, deadlocks, paging, and other operating-system ideas play out step by step.",
    features: [
      "FCFS",
      "SJF",
      "Round Robin",
      "Priority Scheduling",
      "Deadlock Simulation",
      "Paging Visualization",
      "Gantt Charts",
    ],
    techStack: ["React", "TypeScript", "Framer Motion"],
    impact:
      "Makes complex operating system concepts accessible through visualization.",
    previewUrl: "https://schedulix-os.vercel.app",
    githubUrl: "#",
    previewImage: "/assets/SchedulixOSLab.png",
  },
  {
    title: "FinSight Expense Intelligence System",
    category: "Data Analytics",
    description:
      "A practical dashboard for logging expenses, checking budgets, and spotting the spending patterns that are easy to miss day to day.",
    features: [
      "Expense tracking",
      "Budget forecasting",
      "Spending analytics",
      "Financial health meter",
      "Monthly reports",
      "Heatmaps",
    ],
    techStack: ["React", "Tailwind", "Recharts"],
    impact: "Encourages better financial decision making.",
    previewUrl: "https://fin-sight-expense-intelligence-syst.vercel.app",
    githubUrl: "#",
    previewImage:
      "https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "CyberSphere SOC Console - Cyber Attack Simulation Dashboard",
    category: "Cybersecurity",
    description:
      "A safe, interactive SOC-style playground for exploring threat signals, attack scenarios, and the defensive decisions behind them.",
    features: [
      "Phishing simulation",
      "DDoS visualization",
      "Threat maps",
      "Security scoring",
      "Log analysis",
      "Incident monitoring",
    ],
    techStack: ["React", "Tailwind", "Charts"],
    impact: "Promotes cybersecurity awareness and systems thinking.",
    previewUrl: "https://cyber-sphere-avij.netlify.app/",
    githubUrl: "#",
    previewImage: "/assets/cyberSphere.png",
  },
  {
    title: "Smart Study OS Extension",
    category: "Browser Extension",
    description:
      "A browser companion for Smart Study OS that keeps study tools close at hand, including quick access to focus sessions, tasks, and study support.",
    features: [
      "Quick toolbar access",
      "Pomodoro timer",
      "Task management",
      "AI study coaching",
      "Chromium support",
    ],
    techStack: ["Manifest V3", "JavaScript", "Chrome APIs"],
    impact: "Makes the core study workflow available without leaving the browser.",
    previewUrl: "#",
    downloadUrl: "/downloads/aranya-vij-smart-studyos-extension.zip",
    githubUrl: "#",
    previewImage: "/assets/SmartStudyOSDashboard.png",
  },
  {
    title: "Code Runner Escape Protocol",
    category: "Interactive Game",
    description:
      "A puzzle game where players solve programming challenges, reason through clues, and unlock the next terminal one step at a time.",
    features: ["Problem Solving", "Algorithms", "Logic Design", "Game Systems"],
    techStack: ["React", "TypeScript", "Framer Motion"],
    impact: "Teaches programming concepts through engaging gameplay.",
    previewUrl: "https://code-runner-escape-protocol.vercel.app",
    githubUrl: "#",
    previewImage:
      "https://images.pexels.com/photos/2007614/pexels-photo-2007614.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Shield,
  },
  {
    title: "Memory Matrix",
    category: "Interactive Game",
    description:
      "A memory game built around pattern recognition, quick recall, and difficulty that adjusts as the player improves.",
    features: [
      "Adaptive Algorithms",
      "Analytics",
      "Behavioral Design",
      "Progressive Difficulty",
    ],
    techStack: ["React", "TypeScript", "Local Storage"],
    impact: "Enhances cognitive abilities through gamified challenges.",
    previewUrl: "https://memory-matrix-gamma.vercel.app",
    githubUrl: "#",
    previewImage: "/assets/MemoryMatrix.png",
    icon: Brain,
  },
  {
    title: "Campus Tycoon",
    category: "Interactive Game",
    description:
      "A campus-management simulation where players balance academics, events, budgets, and the everyday trade-offs of growing an institution.",
    features: [
      "Simulation Systems",
      "Decision Trees",
      "Resource Management",
      "Strategic Planning",
    ],
    techStack: ["React", "TypeScript", "Zustand"],
    impact: "Develops strategic thinking and management skills.",
    previewUrl: "https://campus-tycoon-chi.vercel.app",
    githubUrl: "#",
    previewImage:
      "https://images.pexels.com/photos/256259/pexels-photo-256259.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Gamepad2,
  },
  {
    title: "DataLens Analytics Lab",
    category: "Data Analytics",
    description:
      "A hands-on analytics workspace for exploring datasets, comparing relationships, and turning results into clear decisions.",
    features: ["Data Exploration", "Visual Analysis", "Relationship Mapping", "Reports"],
    techStack: ["React", "TypeScript", "Recharts"],
    impact: "Makes analytical thinking easier to practice and explain.",
    previewUrl: "https://data-lens-analytics-lab.vercel.app",
    githubUrl: "#",
    previewImage:
      "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: BarChart3,
  },
  {
    title: "LogicGrid",
    category: "Interactive Game",
    description:
      "A puzzle-based learning game that asks players to build solutions, test logic, and improve through increasingly difficult challenges.",
    features: ["Logic Puzzles", "Solution Builder", "Pattern Challenges", "Progress Tracking"],
    techStack: ["React", "TypeScript", "Game Logic"],
    impact: "Builds careful reasoning through short, replayable challenges.",
    previewUrl: "https://logic-grid-nine.vercel.app",
    githubUrl: "#",
    previewImage:
      "https://images.pexels.com/photos/6804602/pexels-photo-6804602.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Puzzle,
  },
  {
    title: "Quantum Shift Puzzle Game",
    category: "Interactive Game",
    description:
      "A strategy puzzle game built around shifting states, planning ahead, and finding efficient paths through changing boards.",
    features: ["State-Based Puzzles", "Path Planning", "Level Progression", "Challenge Modes"],
    techStack: ["React", "TypeScript", "Framer Motion"],
    impact: "Encourages players to reason about change instead of guessing.",
    previewUrl: "https://quantum-shift-puzzle-game.vercel.app",
    githubUrl: "#",
    previewImage:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Rocket,
  },
  {
    title: "Signal Rush Network-routing",
    category: "Interactive Simulation",
    description:
      "A network-routing simulation where players balance speed, reliability, and congestion while moving signals across a live topology.",
    features: ["Routing Decisions", "Network Topology", "Traffic Simulation", "Performance Feedback"],
    techStack: ["React", "TypeScript", "Simulation Logic"],
    impact: "Introduces networking trade-offs through an interactive model.",
    previewUrl: "https://signal-rush-network-routing.vercel.app",
    githubUrl: "#",
    previewImage:
      "https://images.pexels.com/photos/2881224/pexels-photo-2881224.jpeg?auto=compress&cs=tinysrgb&w=800",
    icon: Target,
  },
];

const TIMELINE = [
  {
    year: "2023",
    title: "Started Programming",
    description: "Started programming and exploring software development.",
  },
  {
    year: "2024",
    title: "Web Applications",
    description:
      "Built first major web applications and learned modern frontend technologies.",
  },
  {
    year: "2025",
    title: "AI & Systems Design",
    description:
      "Expanded into AI, systems design, and educational technology.",
  },
  {
    year: "2026",
    title: "Advanced Development",
    description:
      "Developing advanced software projects focused on impact and learning.",
  },
];

const ACHIEVEMENTS = [
  {
    title: "STEM Projects",
    description: "Developed multiple science and technology projects",
  },
  {
    title: "Independent Research",
    description: "Conducted self-directed technical exploration",
  },
  {
    title: "Hackathon Participation",
    description: "Participated in coding competitions and events",
  },
  {
    title: "Open Source Contributions",
    description: "Contributed to community projects",
  },
  {
    title: "Technical Writing",
    description: "Documented projects and shared knowledge",
  },
  {
    title: "CS Club Activities",
    description: "Active member of computer science community",
  },
];

// ============================================
// COMPONENTS
// ============================================

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Research", href: "#research" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary-950/80 backdrop-blur-xl border-b border-white/[0.05]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-white">
            AW
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-primary-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-primary-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-primary-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const titles = ["Future Computer Scientist", "AI Builder", "Systems Thinker"];
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] animate-grid" />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-[128px] pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-[128px] pointer-events-none"
      />

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + i * 20}%`}
            y1="0%"
            x2={`${30 + i * 15}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-mono text-accent-400 mb-6 tracking-wider"
          >
            HELLO, WORLD
          </motion.p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text">Aranya Vij</span>
          </h1>

          <div className="h-12 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-primary-300"
              >
                {titles[currentTitle]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-primary-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Building intelligent systems, simulations, and educational
            technologies that transform complex ideas into accessible
            experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base text-primary-500 max-w-xl mx-auto mb-12"
          >
            I am a high school student passionate about computer science,
            artificial intelligence, cybersecurity, operating systems,
            educational technology, and human-centered software design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRight size={18} />
            </a>
            <a href="#research" className="btn-secondary">
              Research Interests
              <Sparkles size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-primary-500"
          >
            <span className="text-xs tracking-wider">SCROLL</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <Section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-mono text-accent-400 mb-4 tracking-wider">
              ABOUT
            </p>
            <h2 className="section-heading mb-6">
              Driven by <span className="gradient-text">Curiosity</span>
            </h2>
            <div className="space-y-4 text-primary-400 leading-relaxed">
              <p>
                My interests span artificial intelligence, operating systems,
                cybersecurity, data visualization, educational technology, and
                software engineering.
              </p>
              <p>
                I enjoy building systems that help people learn, make informed
                decisions, and better understand complex technical concepts
                through interactive experiences.
              </p>
              <p>
                Through independent projects and continuous exploration, I aim
                to bridge the gap between technology and human understanding.
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <StatCard number="8+" label="Projects Built" icon={Code} />
              <StatCard number="3+" label="Years Coding" icon={Calendar} />
              <StatCard number="8" label="Research Areas" icon={BookOpen} />
              <StatCard number="100%" label="Self-Driven" icon={Target} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function StatCard({
  number,
  label,
  icon: Icon,
}: {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
      <Icon className="w-6 h-6 mx-auto mb-3 text-accent-400" />
      <p className="text-3xl font-bold text-white mb-1">{number}</p>
      <p className="text-sm text-primary-400">{label}</p>
    </div>
  );
}

function ResearchSection() {
  return (
    <Section id="research" className="py-32 px-6 bg-primary-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent-400 mb-4 tracking-wider">
            RESEARCH
          </p>
          <h2 className="section-heading mb-4">Research Interests</h2>
          <p className="section-subheading mx-auto">
            Exploring the frontiers of computer science and technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_INTERESTS.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="card-hover p-6 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-accent-500/10 text-accent-400 group-hover:bg-accent-500/20 transition-colors">
                    <interest.icon size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {interest.title}
                </h3>
                <p className="text-sm text-primary-400 leading-relaxed">
                  {interest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    "AI",
    "Core CS",
    "Data",
    "Security",
    "Extension",
    "Games",
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (filter === "All") return true;
    if (filter === "AI")
      return (
        project.category.includes("AI") ||
        project.category.includes("Educational")
      );
    if (filter === "Core CS") return project.category.includes("Core");
    if (filter === "Data") return project.category.includes("Data");
    if (filter === "Security")
      return (
        project.category.includes("Cybersecurity") &&
        !project.category.includes("Game")
      );
    if (filter === "Extension") return project.category.includes("Extension");
    if (filter === "Games") return project.category.includes("Game");
    return true;
  });

  return (
    <Section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-mono text-accent-400 mb-4 tracking-wider">
            PORTFOLIO
          </p>
          <h2 className="section-heading mb-4">Featured Projects</h2>
          <p className="section-subheading mx-auto">
            Building tools that solve real problems and create meaningful impact
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-accent-500 text-white"
                  : "bg-white/5 text-primary-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const isLive = project.previewUrl && project.previewUrl !== "#";
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card-hover group overflow-hidden"
    >
      {/* Preview Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.previewImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {isLive ? (
            <span className="live-badge">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="coming-badge">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              COMING SOON
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="tag">{project.category}</span>
        </div>

        {/* Icon for Games */}
        {IconComponent && (
          <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-accent-500/20 text-accent-400 backdrop-blur-sm">
            <IconComponent size={24} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-primary-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <p className="text-xs font-mono text-primary-500 mb-2">FEATURES</p>
          <div className="flex flex-wrap gap-1.5">
            {project.features.slice(0, 4).map((feature) => (
              <span
                key={feature}
                className="text-xs px-2 py-1 rounded bg-white/5 text-primary-300"
              >
                {feature}
              </span>
            ))}
            {project.features.length > 4 && (
              <span className="text-xs px-2 py-1 rounded bg-white/5 text-primary-400">
                +{project.features.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-1 rounded bg-accent-500/10 text-accent-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Impact */}
        <div className="flex items-center gap-2 text-sm text-primary-400 mb-6">
          <Lightbulb size={16} className="text-accent-400 flex-shrink-0" />
          <span>{project.impact}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {isLive ? (
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-accent-500 text-white hover:bg-accent-600 transition-all"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white/5 text-primary-500 cursor-not-allowed"
            >
              <ExternalLink size={16} />
              Coming Soon
            </button>
          )}

          {project.downloadUrl && (
            <a
              href={project.downloadUrl}
              download
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white/5 text-primary-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <ExternalLink size={16} />
              Download Extension
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineSection() {
  return (
    <Section id="journey" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent-400 mb-4 tracking-wider">
            EVOLUTION
          </p>
          <h2 className="section-heading mb-4">Learning Journey</h2>
          <p className="section-subheading mx-auto">
            A timeline of growth and discovery
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500/50 via-accent-400/30 to-transparent hidden lg:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {TIMELINE.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                >
                  <div className="glass-hover rounded-2xl p-6">
                    <span className="text-4xl font-bold text-accent-400 mb-2 block">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary-400">{item.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-accent-500 ring-4 ring-primary-950 animate-pulse-slow" />
                </div>

                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function AchievementsSection() {
  return (
    <Section id="achievements" className="py-32 px-6 bg-primary-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent-400 mb-4 tracking-wider">
            RECOGNITION
          </p>
          <h2 className="section-heading mb-4">Achievements</h2>
          <p className="section-subheading mx-auto">
            Milestones and accomplishments along the journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-hover p-6 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-accent-500/10 text-accent-400">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-primary-400">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function GitHubSection() {
  const stats = [
    { label: "Repositories", value: "12+", icon: Code },
    { label: "Contributions", value: "500+", icon: Heart },
    { label: "Languages", value: "5", icon: Puzzle },
    { label: "Projects", value: "12", icon: Rocket },
  ];

  const languages = [
    { name: "TypeScript", percentage: 45 },
    { name: "Python", percentage: 25 },
    { name: "JavaScript", percentage: 15 },
    { name: "HTML/CSS", percentage: 10 },
    { name: "Other", percentage: 5 },
  ];

  return (
    <Section id="github" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-accent-400 mb-4 tracking-wider">
            OPEN SOURCE
          </p>
          <h2 className="section-heading mb-4">GitHub Insights</h2>
          <p className="section-subheading mx-auto">
            Contributing to the developer community
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Stats */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">
              Activity Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                >
                  <stat.icon className="w-5 h-5 text-accent-400 mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-primary-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6">
              Languages Used
            </h3>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{lang.name}</span>
                    <span className="text-primary-400">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}

function FutureGoalsSection() {
  return (
    <Section id="goals" className="py-32 px-6 bg-primary-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <Rocket className="w-12 h-12 text-accent-400 mx-auto mb-6" />
        <h2 className="section-heading mb-6">
          Building Technology That{" "}
          <span className="gradient-text">Helps People Learn Better</span>
        </h2>
        <p className="text-lg text-primary-400 leading-relaxed mb-8">
          I aspire to study computer science at a leading research university
          and contribute to technologies that improve education,
          decision-making, and understanding of complex systems.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            "MIT",
            "Stanford",
            "Cornell",
            "CMU",
            "UC Berkeley",
            "Georgia Tech",
          ].map((uni) => (
            <span key={uni} className="tag">
              {uni}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <Section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-mono text-accent-400 mb-4 tracking-wider">
            CONNECT
          </p>
          <h2 className="section-heading mb-4">Get in Touch</h2>
          <p className="section-subheading mx-auto">
            Interested in collaborating or just want to say hello? Let's
            connect.
          </p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="grid gap-6">
            <a
              href="mailto:aranyavij9@gmail.com"
              className="card-hover p-6 flex flex-col items-center gap-4 text-center group"
            >
              <div className="p-4 rounded-xl bg-white/5 text-primary-400 group-hover:bg-accent-500/20 group-hover:text-accent-400 transition-all">
                <Mail size={28} />
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Email</p>
                <p className="text-sm text-primary-400">aranyavij9@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-primary-500">
          {new Date().getFullYear()} Aranya Vij. Built with passion and
          curiosity.
        </p>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP
// ============================================

function App() {
  return (
    <div className="bg-primary-950 min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ResearchSection />
        <ProjectsSection />
        <TimelineSection />
        <AchievementsSection />
        <GitHubSection />
        <FutureGoalsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
