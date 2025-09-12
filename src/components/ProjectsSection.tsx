import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ExternalLink, Github, Calendar, Zap, Shield, Brain, Cpu } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  tags: string[];
  year: number;
  liveUrl?: string;
  repoUrl?: string;
  category: string;
  status?: string;
  impact?: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = defaultProjects,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      activeTab === "all" || project.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary neon-text">
          <Zap className="inline-block mr-3" />
          Project Arsenal
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
          Cutting-edge cybersecurity solutions, AI-powered defense systems, and quantum-resistant architectures 
          that push the boundaries of digital security.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10 cyberpunk-border bg-background/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full md:w-auto bg-card/50 border border-border/50">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground text-lg">
              No projects match your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectDetailsDialog
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails,
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active": return "text-green-400 border-green-400";
      case "research": return "text-yellow-400 border-yellow-400";
      case "completed": return "text-blue-400 border-blue-400";
      default: return "text-primary border-primary";
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col cyberpunk-border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group">
      <div className="aspect-video overflow-hidden bg-muted relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.status && (
          <Badge 
            variant="outline" 
            className={`absolute top-3 right-3 ${getStatusColor(project.status)} bg-background/80 backdrop-blur-sm`}
          >
            {project.status}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {project.year}
          </div>
        </div>
        <CardDescription className="text-foreground/80 leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.tags.length - 4}
            </Badge>
          )}
        </div>
        
        {project.impact && (
          <div className="text-xs text-accent font-medium">
            Impact: {project.impact}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-border/30">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1 cyberpunk-border hover:bg-primary/10" 
            onClick={onViewDetails}
          >
            <Brain className="w-4 h-4 mr-2" />
            Analyze
          </Button>
          <div className="flex gap-1">
            {project.liveUrl && (
              <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live project"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project repository"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

interface ProjectDetailsDialogProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const ProjectDetailsDialog: React.FC<ProjectDetailsDialogProps> = ({
  project,
  open,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto cyberpunk-border bg-card/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-secondary mb-2">
            {project.title}
          </DialogTitle>
          <DialogDescription className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-accent text-accent">
                {project.year}
              </Badge>
              {project.status && (
                <Badge variant="outline" className="border-primary text-primary">
                  {project.status}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-primary/20 text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-6 cyberpunk-border">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">Overview</h3>
            <p className="text-foreground/90 leading-relaxed">{project.description}</p>
          </div>
          
          {project.detailedDescription && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Technical Details</h3>
              <div className="prose prose-sm max-w-none text-foreground/90">
                <p className="leading-relaxed">{project.detailedDescription}</p>
              </div>
            </div>
          )}
          
          {project.impact && (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">Impact & Results</h3>
              <p className="text-accent font-medium">{project.impact}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border/30">
          {project.liveUrl && (
            <Button asChild className="cyberpunk-glow bg-primary hover:bg-primary/90">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> 
                Launch System
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" asChild className="cyberpunk-border">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> 
                Access Code
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Cyberpunk-themed projects data
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "QuantumShield Defense Matrix",
    description: "AI-powered quantum-resistant encryption system that adapts to emerging threats in real-time.",
    detailedDescription: "Revolutionary cybersecurity platform combining quantum cryptography with machine learning to create an adaptive defense matrix. The system uses neural networks to predict attack patterns and automatically generates quantum-resistant encryption keys. Features include real-time threat analysis, automated incident response, and zero-trust architecture implementation.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
    tags: ["Quantum Computing", "AI/ML", "Cryptography", "Python", "C++", "TensorFlow"],
    year: 2024,
    liveUrl: "https://quantumshield.demo",
    repoUrl: "https://github.com/alexcipher/quantumshield",
    category: "security",
    status: "active",
    impact: "Protected 50,000+ endpoints, reduced breach attempts by 95%"
  },
  {
    id: "2",
    title: "Neural Threat Hunter",
    description: "Deep learning system that identifies zero-day exploits and advanced persistent threats before they strike.",
    detailedDescription: "Advanced threat detection system using deep neural networks and behavioral analysis to identify previously unknown malware and attack vectors. The system analyzes network traffic, system calls, and user behavior patterns to detect anomalies that traditional signature-based systems miss. Includes automated threat intelligence gathering and response orchestration.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    tags: ["Deep Learning", "Threat Detection", "Python", "PyTorch", "Elasticsearch", "Kafka"],
    year: 2023,
    liveUrl: "https://neuralhunter.demo",
    repoUrl: "https://github.com/alexcipher/neural-threat-hunter",
    category: "ai",
    status: "completed",
    impact: "Detected 127 zero-day threats, 99.7% accuracy rate"
  },
  {
    id: "3",
    title: "CyberFortress IoT Security",
    description: "Comprehensive security framework for IoT devices with hardware-level protection and mesh networking.",
    detailedDescription: "End-to-end IoT security solution featuring custom hardware security modules, encrypted mesh networking, and centralized device management. The system provides secure boot, runtime attestation, and over-the-air updates for IoT devices. Includes a web-based dashboard for monitoring device health and security status across distributed networks.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    tags: ["IoT Security", "Hardware", "Embedded C", "React", "Node.js", "LoRaWAN"],
    year: 2023,
    repoUrl: "https://github.com/alexcipher/cyberfortress-iot",
    category: "hardware",
    status: "active",
    impact: "Secured 100,000+ IoT devices across 50 smart cities"
  },
  {
    id: "4",
    title: "BlockChain Forensics Suite",
    description: "Advanced blockchain analysis platform for cryptocurrency investigations and compliance monitoring.",
    detailedDescription: "Comprehensive blockchain forensics platform that traces cryptocurrency transactions, identifies suspicious patterns, and generates compliance reports. Features advanced graph analysis, machine learning-based clustering, and integration with major cryptocurrency exchanges. Supports Bitcoin, Ethereum, and 50+ other cryptocurrencies with real-time monitoring capabilities.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    tags: ["Blockchain", "Forensics", "Python", "Neo4j", "React", "GraphQL"],
    year: 2022,
    liveUrl: "https://blockforensics.demo",
    repoUrl: "https://github.com/alexcipher/blockchain-forensics",
    category: "blockchain",
    status: "completed",
    impact: "Assisted in $50M+ cryptocurrency recovery cases"
  },
  {
    id: "5",
    title: "Quantum Key Distribution Network",
    description: "Experimental quantum communication network for ultra-secure data transmission between research facilities.",
    detailedDescription: "Cutting-edge quantum key distribution system implementing BB84 protocol for unconditionally secure communication. The network spans multiple research facilities and provides quantum-secured channels for sensitive data transmission. Features real-time quantum state monitoring, error correction, and integration with classical networking infrastructure.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    tags: ["Quantum Physics", "Cryptography", "C++", "Python", "Optics", "Research"],
    year: 2024,
    category: "research",
    status: "research",
    impact: "First practical QKD network spanning 100km+ distance"
  },
  {
    id: "6",
    title: "AI-Powered Penetration Testing",
    description: "Autonomous penetration testing framework that uses reinforcement learning to discover vulnerabilities.",
    detailedDescription: "Revolutionary automated penetration testing system that uses reinforcement learning to discover and exploit vulnerabilities without human intervention. The AI agent learns from each engagement, building a knowledge base of attack techniques and defensive countermeasures. Includes comprehensive reporting and remediation recommendations.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    tags: ["AI/ML", "Penetration Testing", "Python", "Reinforcement Learning", "Metasploit"],
    year: 2023,
    repoUrl: "https://github.com/alexcipher/ai-pentest",
    category: "ai",
    status: "active",
    impact: "Automated testing for 1000+ applications, 40% faster than manual testing"
  },
  {
    id: "7",
    title: "Secure Multi-Party Computation Platform",
    description: "Privacy-preserving computation platform enabling secure data analysis without revealing sensitive information.",
    detailedDescription: "Advanced secure multi-party computation platform that allows multiple parties to jointly compute functions over their inputs while keeping those inputs private. Implements cutting-edge cryptographic protocols including garbled circuits and secret sharing. Features a user-friendly API and supports various data analysis tasks including machine learning on encrypted data.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tags: ["Cryptography", "Privacy", "Rust", "React", "WebAssembly", "MPC"],
    year: 2024,
    liveUrl: "https://securempc.demo",
    repoUrl: "https://github.com/alexcipher/secure-mpc",
    category: "cryptography",
    status: "active",
    impact: "Enabled privacy-preserving analysis for 10+ healthcare organizations"
  },
  {
    id: "8",
    title: "Cyber Range Training Platform",
    description: "Immersive cybersecurity training environment with realistic attack scenarios and hands-on exercises.",
    detailedDescription: "Comprehensive cybersecurity training platform featuring realistic network environments, attack scenarios, and hands-on exercises. The platform uses containerized environments to simulate real-world infrastructure and provides guided learning paths for different skill levels. Includes automated scoring, progress tracking, and team-based exercises for collaborative learning.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    tags: ["Education", "Docker", "Kubernetes", "React", "Node.js", "Cybersecurity"],
    year: 2022,
    liveUrl: "https://cyberrange.demo",
    repoUrl: "https://github.com/alexcipher/cyber-range",
    category: "education",
    status: "completed",
    impact: "Trained 5000+ cybersecurity professionals across 20 countries"
  }
];

export default ProjectsSection;