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

  // Sample data for certifications section
  const certifications = [
    {
      title: "AWS Certified Solutions Architect Professional",
      organization: "Amazon Web Services",
      date: "December 2023",
      credentialId: "AWS-SAP-2023-001",
      verifyUrl: "https://aws.amazon.com/verification",
      badgeUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=100&q=80",
      level: "Professional"
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      organization: "Cloud Native Computing Foundation",
      date: "October 2023",
      credentialId: "CKA-2023-789",
      verifyUrl: "https://www.cncf.io/certification/verify",
      badgeUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=100&q=80",
      level: "Professional"
    },
    {
      title: "TensorFlow Developer Certificate",
      organization: "Google",
      date: "August 2023",
      credentialId: "TF-DEV-456",
      verifyUrl: "https://www.tensorflow.org/certificate",
      badgeUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=100&q=80",
      level: "Intermediate"
    },
    {
      title: "Certified Ethical Hacker (CEH)",
      organization: "EC-Council",
      date: "June 2023",
      credentialId: "CEH-2023-123",
      verifyUrl: "https://www.eccouncil.org/verify",
      badgeUrl: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=100&q=80",
      level: "Professional"
    },
  ];

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Hero section with cyberpunk styling
  const renderHeroSection = () => (
    <div className="relative py-20 text-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="relative z-10">
        <motion.div 
          className="inline-block relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="w-40 h-40 rounded-full overflow-hidden cyberpunk-border cyberpunk-glow">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=cyberpunk-dev"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse"></div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4 neon-text text-primary"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          DYLAN THOMAS M. RAÑOLA
        </motion.h1>
        
        <motion.div
          className="text-xl md:text-2xl text-secondary mb-6 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="text-accent">&gt;</span> Computer Engineer
          <span className="animate-pulse">_</span>
        </motion.div>
        
        <motion.p 
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          A Computer Engineering student aspiring to become a cybersecurity specialist, passionate about securing networks, learning ethical hacking, and exploring AI-driven defenses for the future of digital security.
        </motion.p>
        
        <motion.div 
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a href="https://github.com/dae-jpeg" className="text-primary hover:text-secondary transition-colors cyberpunk-glow p-3 rounded-full">
            <Github className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/in/dylanranola/" className="text-primary hover:text-secondary transition-colors cyberpunk-glow p-3 rounded-full">
            <Linkedin className="w-8 h-8" />
          </a>
          <a href="mailto:dylanranola@gmail.com" className="text-primary hover:text-secondary transition-colors cyberpunk-glow p-3 rounded-full">
            <Mail className="w-8 h-8" />
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {["Computer Engineering", "Networks", "Embedded Systems", "Cybersecurity"].map((tag) => (
            <Badge key={tag} variant="outline" className="cyberpunk-border text-primary border-primary/50 hover:bg-primary/10">
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>
    </div>
  );

  // About section
  const renderAboutSection = () => (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="py-16"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary neon-text">
          <Code className="inline-block mr-3" />
          About Me
        </h2>
        <Card className="cyberpunk-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-foreground/90 mb-6">
            I’m a Computer Engineering undergraduate specializing in network security, with a strong interest in building secure and reliable systems. Beyond academics, I develop projects as a hobby, ranging from inventory management systems and embedded devices to multi-tenant applications. My work often involves full-stack development using tools like Django, PostgreSQL, and other modern technologies.
            </p>
            {/* <p className="text-lg leading-relaxed text-foreground/90 mb-6">
              When I'm not hunting zero-days or architecting quantum-resistant protocols, you'll find me 
              contributing to open-source security tools, mentoring the next generation of ethical hackers, 
              or exploring the intersection of consciousness and artificial intelligence.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              My mission: Make the digital world safer for everyone while pushing the boundaries of what's 
              possible in cybersecurity and AI.
            </p> */}
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );

  // Skills section with cyberpunk styling
  const renderSkillsSection = () => (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-16"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-primary neon-text">
        <Cpu className="inline-block mr-3" />
        Tech Arsenal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, skillList]) => (
          <motion.div key={category} variants={fadeInUp}>
            <Card className="cyberpunk-border bg-card/30 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-secondary capitalize text-xl">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillList.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <span>{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );

  // Achievements section
  const renderAchievementsSection = () => (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-16"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-primary neon-text">
        <Award className="inline-block mr-3" />
        Achievements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="cyberpunk-border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-secondary mb-1">{achievement.title}</h3>
                    <p className="text-primary text-sm mb-2">{achievement.organization} • {achievement.date}</p>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );

  // Contact form
  const renderContactForm = () => (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="py-16"
    >
      <h2 className="text-3xl font-bold mb-12 text-center text-primary neon-text">
        <Zap className="inline-block mr-3" />
        Initiate Contact
      </h2>
      <Card className="max-w-2xl mx-auto cyberpunk-border bg-card/30 backdrop-blur-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400"
              >
                <CheckCircle className="h-5 w-5" />
                <span>{submitMessage}</span>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400"
              >
                <AlertCircle className="h-5 w-5" />
                <span>{submitMessage}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Name</label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name" 
                  className="cyberpunk-border bg-background/50" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                <Input 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com" 
                  className="cyberpunk-border bg-background/50" 
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Subject</label>
              <Input 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project collaboration, security consultation, etc." 
                className="cyberpunk-border bg-background/50" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Message</label>
              <Textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or security challenge..." 
                rows={5}
                className="cyberpunk-border bg-background/50"
                required
              />
            </div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full cyberpunk-glow bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Encrypted Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        {renderHeroSection()}

        {/* About Section */}
        {renderAboutSection()}

        {/* Skills Section */}
        {renderSkillsSection()}

        {/* Projects Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="py-16"
        >
          <ProjectsSection />
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="py-16"
        >
          <ContentSection
            title="Certifications"
            content={{
              type: "certifications",
              data: certifications,
            }}
          />
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="py-16"
        >
          <ContentSection
            title="Professional Experience"
            content={{
              type: "experience",
              data: experiences,
            }}
          />
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="py-16"
        >
          <ContentSection
            title="Education"
            content={{
              type: "education",
              data: education,
            }}
          />
        </motion.section>

        {/* Achievements Section */}
        {renderAchievementsSection()}

        {/* Contact Form */}
        {renderContactForm()}

        {/* Download CV Button */}
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button size="lg" className="cyberpunk-glow bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Download className="mr-2 h-5 w-5" />
            Download Quantum CV
          </Button>
        </motion.div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border/50">
          <p className="text-muted-foreground font-mono">
            <span className="text-primary">&gt;</span> Secured by quantum encryption • 
            Built with React & TypeScript • 
            {new Date().getFullYear()} Alex Cipher
            <span className="animate-pulse">_</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;