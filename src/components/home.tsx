import React, { useState } from "react";
import { motion } from "framer-motion";
import ContentSection from "./ContentSection";
import ProjectsSection from "./ProjectsSection";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, Download, ExternalLink, Award, Briefcase, GraduationCap, Code, Cpu, Zap, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const Home = () => {
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample data for skills section
  const skills = {
    languages: [
      { name: "JavaScript", level: 95, icon: "⚡" },
      { name: "TypeScript", level: 90, icon: "🔷" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "C++", level: 80, icon: "⚙️" },
      // { name: "Rust", level: 75, icon: "🦀" },
      // { name: "Go", level: 70, icon: "🔵" },
    ],
    frameworks: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
      { name: "Node.js", level: 85, icon: "💚" },
      { name: "PostgreSQL", level: 80, icon: "🚀" },
      { name: "Laravel", level: 80, icon: "🎯" },
      // { name: "TensorFlow", level: 70, icon: "🧠" },
    ],
    tools: [
      // { name: "Docker", level: 90, icon: "🐳" },
      // { name: "Kubernetes", level: 85, icon: "☸️" },
      // { name: "AWS", level: 80, icon: "☁️" },
      { name: "Git", level: 95, icon: "📝" },
      // { name: "Linux", level: 85, icon: "🐧" },
      { name: "Figma", level: 75, icon: "🎨" },
      { name: "Laragon", level: 90, icon: "🖥️" },
    ],
    databases: [
      { name: "PostgreSQL", level: 80, icon: "🐘" },
      { name: "MySQL", level: 85, icon: "🛢️" },
    ],
    hardware: [
      { name: "Arduino", level: 90, icon: "🔌" },
      // { name: "Raspberry Pi", level: 85, icon: "🍓" },
      { name: "ESP32", level: 80, icon: "📡" },
      { name: "PCB Design", level: 70, icon: "🔧" },
      // { name: "3D Printing", level: 75, icon: "🖨️" },
      { name: "Soldering", level: 85, icon: "🔥" },
    ],
  };

  // Sample data for experience section
  const experiences = [
    {
      title: "Programming Intern",
      company: "Philippine Air Force",
      location: "Colonel Jesus Villamor Air Base, Pasay City",
      period: "April 2025 - June 2025",
      description: "",
      technologies: ["Django", "Python", "PostgreSQL", "React", "TypeScript", "HTML", "CSS", "JavaScript"],
      achievements: [
        "Developed a web-based inventory management system for the Philippine Air Force",
        "Successfully implemented and gained hands-on experience with Django and PostgreSQL throughout various projects."
      ]
    },
    // {
    //   title: "Cybersecurity Research Engineer",
    //   company: "Quantum Defense Labs",
    //   location: "Boston, MA",
    //   period: "March 2021 - December 2022",
    //   description: "Developed AI-powered threat detection algorithms and blockchain-based security protocols. Created custom hardware solutions for secure communications. Published 3 research papers in top-tier security conferences.",
    //   technologies: ["Python", "C++", "Blockchain", "Machine Learning", "Hardware Security"],
    //   achievements: [
    //     "Patent pending for quantum encryption method",
    //     "Discovered 5 zero-day vulnerabilities",
    //     "Presented at DEF CON 2022"
    //   ]
    // },
    // {
    //   title: "IoT Security Specialist",
    //   company: "NeuralLink Systems",
    //   location: "Austin, TX",
    //   period: "June 2019 - February 2021",
    //   description: "Designed secure IoT architectures for smart city infrastructure. Developed custom firmware for edge devices with advanced encryption. Led penetration testing for critical infrastructure systems.",
    //   technologies: ["C", "Rust", "ESP32", "LoRaWAN", "Cryptography"],
    //   achievements: [
    //     "Secured 50,000+ IoT devices",
    //     "Reduced security incidents by 85%",
    //     "Created industry-standard security protocols"
    //   ]
    // },
  ];

  // Sample data for education section
  const education = [
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "PHINMA University of Pangasinan",
      location: "Dagupan City, Pangasinan, Philippines",
      period: "2021 - 2025",
      description: 'Computer Engineering student specializing in embedded systems and microcontrollers such as Arduino and ESP32, with additional knowledge in software and web development.',
      achievements: [
        "Regional Convention – Region 1 (2022) - Quiz Bowl Competition, 2nd Runner Up",
        "Member, Institute of Computer Engineers of the Philippines, ICpEP.se",
        "Capstone Project/Thesis – CheckInGo: A Smart Hotel Management System"
      ],
      coursework: ["Embedded Systems Design", "Computer Networks & Security", "Digital Logic & Microprocessors", "Computer Architecture & Organization"]
    },
    {
      degree: "Science, Technology, Engineering and Mathematics",
      institution: "PHINMA University of Pangasinan",
      location: "Dagupan City, Pangasinan, Philippines",
      period: "2019 -2021",
      description: 'Focused on science, technology, engineering, and mathematics with emphasis on problem-solving, research, and technical skills as preparation for engineering studies.',
      achievements: [
        "With Honors",
      ],
      coursework: ["Pre-Calculus & Calculus", "General Physics", "General Chemistry", "Computer Programming", "Statistics & Probability", "Research & Design Projects"]
    },
  ];

  // Sample achievements data
  const achievements = [
    {
      title: "ICpEP.SE Regional Convention – Region 1 (Quiz Bowl, 2nd Runner Up)",
      organization: "Institute of Computer Engineers of the Philippines, ICpEP.se",
      date: "December 2022",
      description: "Participated in the ICpEP.SE Regional Convention themed 'Neural Glocalization on Digital Trends' held at Urdaneta City University Gymnasium.",
      icon: "🥈"
    },
    {
      title: "Senior High School – With Honors",
      organization: "PHINMA University of Pangasinan",
      date: "2019–2021",
      description: "Graduated with honors under the STEM strand.",
      icon: "🎓"
    },
    {
      title: "Junior High School – With Honors",
      organization: "Daniel Maramba National High School",
      date: "2015–2019",
      description: "Consistently recognized as an honor student throughout junior high.",
      icon: "📘"
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  // Resume Header Section
  const renderResumeHeader = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="border-b border-zinc-800/80 pb-4 sm:pb-5 mb-6 sm:mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
        <motion.div variants={fadeInUp}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 leading-tight bg-gradient-to-br from-zinc-50 via-zinc-200 to-cyan-400/70 bg-clip-text text-transparent portfolio-shimmer">
            DYLAN THOMAS M. RAÑOLA
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-normal flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400/90 shrink-0" aria-hidden />
            <span>Computer Engineer</span>
          </p>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
            <a href="mailto:dylanranola@gmail.com" className="hover:text-zinc-200 transition-colors break-all sm:break-normal">
              dylanranola@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
            <a href="https://www.linkedin.com/in/dylanranola/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors break-all sm:break-normal">
              linkedin.com/in/dylanranola
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 flex-shrink-0" />
            <a href="https://github.com/dae-jpeg" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-200 transition-colors break-all sm:break-normal">
              github.com/dae-jpeg
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Professional Summary Section
  const renderSummarySection = () => (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 sm:mb-8"
    >
      <h2 className="section-heading-energy text-base sm:text-lg font-semibold text-zinc-50 mb-3 sm:mb-4 pb-2">
        Professional Summary
      </h2>
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        Computer Engineering undergraduate specializing in network security, with a strong interest in building secure and reliable systems. 
        Experienced in full-stack development using Django, PostgreSQL, React, and modern web technologies. 
        Passionate about embedded systems, cybersecurity, and developing practical solutions for real-world problems.
      </p>
    </motion.section>
  );

  // Skills section - Resume style with animations
  const renderSkillsSection = () => {
    const skillsData = {
      "Tech Stack": [
        { name: "Python", icon: "🐍" },
        { name: "Django", icon: "🎯" },
        { name: "React", icon: "⚛️" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Laravel", icon: "🎯" }
      ],
      "Networking": [
        { name: "IP Addressing", icon: "🌐" },
        { name: "Subnetting", icon: "📡" },
        { name: "MAC Addressing", icon: "🔌" },
        { name: "DNS", icon: "🔍" },
        { name: "DHCP", icon: "⚡" }
      ],
      "Tools": [
        { name: "Git & GitHub", icon: "📝" },
        { name: "VS Code", icon: "💻" },
        { name: "Postman", icon: "📮" }
      ],
      "UI/UX Design": [
        { name: "Figma", icon: "🎨" },
        { name: "WordPress", icon: "📝" },
        { name: "Wix", icon: "🌐" }
      ],
      "Microsoft Office": [
        { name: "Word", icon: "📄" },
        { name: "PowerPoint", icon: "📊" },
        { name: "Excel", icon: "📈" }
      ],
      "Networking Tools": [
        { name: "Packet Tracer", icon: "📡" },
        { name: "Nmap", icon: "🔍" },
        { name: "Wireshark", icon: "🦈" }
      ]
    };

    return (
      <section className="mb-8">
        <h2 className="section-heading-energy text-base sm:text-lg font-semibold text-zinc-50 mb-3 sm:mb-4 pb-2">
          Skills & Competencies
        </h2>
        <div className="space-y-4 sm:space-y-5">
          {Object.entries(skillsData).map(([category, skillList], categoryIndex) => (
            <div key={category} className="group">
              <h3 className="text-xs sm:text-sm font-medium text-zinc-300 mb-2 sm:mb-3 group-hover:text-zinc-100 transition-colors duration-300">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skillList.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05), duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="w-full sm:w-auto"
                  >
                    <Badge 
                      variant="secondary" 
                      className="skill-badge text-[10px] sm:text-xs bg-zinc-900/80 text-zinc-300 border-zinc-700/50 
                        px-2 py-1 sm:px-3 sm:py-1.5 cursor-default w-full sm:w-auto justify-center sm:justify-start
                        hover:border-blue-500/40 hover:text-zinc-100 hover:shadow-lg hover:shadow-blue-500/20
                        transition-all duration-300 relative overflow-hidden group/badge backdrop-blur-sm"
                    >
                      <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                        <span className="text-xs sm:text-sm">{skill.icon}</span>
                        <span className="truncate">{skill.name}</span>
                      </span>
                      <div className="absolute inset-0 skill-gradient opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Achievements section - Resume style
  const renderAchievementsSection = () => (
    <section className="mb-6 sm:mb-8">
      <h2 className="section-heading-energy text-base sm:text-lg font-semibold text-zinc-50 mb-3 sm:mb-4 pb-2">
        Achievements & Awards
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className="border-l-2 border-l-cyan-500/40 border-zinc-800 pl-3 sm:pl-4 rounded-r-md bg-zinc-900/20 py-1"
          >
            <h3 className="text-xs sm:text-sm font-medium text-zinc-200 break-words">{achievement.title}</h3>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-1.5 break-words">{achievement.organization} • {achievement.date}</p>
            <p className="text-[10px] sm:text-xs text-zinc-300 mt-1 break-words">{achievement.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );


  return (
    <div className="min-h-screen bg-zinc-950 text-foreground print:bg-white relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-[0.11] print:hidden" aria-hidden />
      <div className="portfolio-ambient pointer-events-none fixed inset-0 print:hidden" aria-hidden />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 print:px-8 print:py-4 relative z-10">
        {/* Resume Header */}
        {renderResumeHeader()}

        {/* Professional Summary */}
        {renderSummarySection()}

        {/* Experience Section */}
        <section className="mb-6 sm:mb-8">
          <h2 className="section-heading-energy text-base sm:text-lg font-semibold text-zinc-50 mb-4 sm:mb-5 pb-2">
            Professional Experience
          </h2>
          <ContentSection
            title=""
            content={{
              type: "experience",
              data: experiences,
            }}
          />
        </section>

        {/* Education Section */}
        <section className="mb-6 sm:mb-8">
          <h2 className="section-heading-energy text-base sm:text-lg font-semibold text-zinc-50 mb-3 sm:mb-4 pb-2">
            Education
          </h2>
          <ContentSection
            title=""
            content={{
              type: "education",
              data: education,
            }}
          />
        </section>

        {/* Skills Section */}
        {renderSkillsSection()}

        {/* Projects Section */}
        <section className="mb-6 sm:mb-8">
          <h2 className="section-heading-energy text-base sm:text-lg font-semibold text-zinc-50 mb-3 sm:mb-4 pb-2">
            Projects
          </h2>
          <ProjectsSection />
        </section>

        {/* Achievements Section */}
        {renderAchievementsSection()}

        {/* Download CV Button - Hidden in print */}
        {/* <div className="text-center py-4 sm:py-6 print:hidden">
          <Button size="lg" className="portfolio-cta bg-zinc-900/90 text-zinc-50 border border-cyan-500/30 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 shadow-lg shadow-cyan-500/10 hover:bg-zinc-800/95 hover:shadow-cyan-500/25 hover:border-cyan-400/50 transition-all duration-300">
            <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Download PDF Resume</span>
            <span className="sm:hidden">Download PDF</span>
          </Button>
        </div> */}

        {/* Footer - Hidden in print */}
        <footer className="text-center py-4 sm:py-6 border-t border-zinc-800 print:hidden">
          <p className="text-zinc-500 text-[10px] sm:text-xs break-words px-2">
            Built with React & TypeScript • 
            {new Date().getFullYear()} Dylan Thomas M. Rañola
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;