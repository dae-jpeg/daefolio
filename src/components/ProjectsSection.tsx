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
    <div className="space-y-4 sm:space-y-5 print:space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="print:break-inside-avoid">
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-200 mb-1.5 sm:mb-2 break-words">{project.title}</h3>
          <ul className="space-y-1 sm:space-y-1.5 mb-2">
            <li className="text-[10px] sm:text-xs text-zinc-300 flex items-start gap-1.5 sm:gap-2">
              <span className="text-zinc-500 mt-1.5 text-[10px] sm:text-xs flex-shrink-0">•</span>
              <span className="break-words">{project.description}</span>
            </li>
            <li className="text-[10px] sm:text-xs text-zinc-300 flex items-start gap-1.5 sm:gap-2">
              <span className="text-zinc-500 mt-1.5 text-[10px] sm:text-xs flex-shrink-0">•</span>
              <span className="break-words">
                <span className="font-medium">Tech Stack:</span> {project.tags.filter(tag => 
                  !['PWA', 'QR Code', 'Hotel Management', 'Inventory Management', 'Multi-Tenant', 'Logistics'].includes(tag)
                ).join(', ')}
              </span>
            </li>
          </ul>
        </div>
      ))}
    </div>
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
    <Card className="overflow-hidden h-full flex flex-col border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group">
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
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
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
            <Badge key={tag} variant="secondary" className="text-xs">
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
          <div className="text-xs text-primary font-medium">
            Impact: {project.impact}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-border/30">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1 hover:bg-primary/10" 
            onClick={onViewDetails}
          >
            <Brain className="w-4 h-4 mr-2" />
            View Details
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-border bg-card/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-foreground mb-2">
            {project.title}
          </DialogTitle>
          <DialogDescription className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-primary text-primary">
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
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="aspect-video overflow-hidden rounded-lg bg-muted mb-6 border border-border">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
            <p className="text-foreground/90 leading-relaxed">{project.description}</p>
          </div>
          
          {project.detailedDescription && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Technical Details</h3>
              <div className="prose prose-sm max-w-none text-foreground/90">
                <p className="leading-relaxed">{project.detailedDescription}</p>
              </div>
            </div>
          )}
          
          {project.impact && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Impact & Results</h3>
              <p className="text-primary font-medium">{project.impact}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border/30">
          {project.liveUrl && (
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> 
                View Live
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button variant="outline" asChild>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> 
                View Code
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Projects data
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "CheckInGo: A Progressive Web Application for Hotel Management System",
    description: "A web and mobile-based system for hotel operations, featuring room management, billing, and service ordering. Guests receive unique QR codes to access their assigned rooms, while admins can manage bookings, users, and transactions in real time.",
    detailedDescription: "A comprehensive hotel management system built as a Progressive Web Application (PWA) that streamlines hotel operations. The system enables guests to check in using QR codes, order services, and manage their stay through a mobile-friendly interface. Administrators have full control over room assignments, billing, user management, and real-time transaction monitoring.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    tags: ["React", "PHP", "Laravel", "PWA", "QR Code", "Hotel Management"],
    year: 2024,
    category: "web",
    status: "completed"
  },
  {
    id: "2",
    title: "Armory Inventory Management System",
    description: "Developed during internship for the Philippine Air Force, this system manages weapon and equipment inventory for a single armory unit. Includes real-time inbound/outbound tracking powered by QR scanning to improve accuracy and accountability.",
    detailedDescription: "An inventory management system developed for the Philippine Air Force during an internship program. The system tracks weapons and equipment for armory units using QR code scanning technology. Features include real-time tracking of inbound and outbound items, automated inventory updates, and comprehensive reporting to ensure accountability and accuracy in equipment management.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL", "QR Code", "Inventory Management"],
    year: 2025,
    category: "web",
    status: "completed"
  },
  {
    id: "3",
    title: "Multi-Tenant Logistics and Inventory Management System",
    description: "A real-time inventory platform designed for multiple companies to track inbound and outbound goods efficiently. Integrated with QR code scanning for faster and more accurate transaction logging, featuring secure tenant data isolation and live updates.",
    detailedDescription: "A comprehensive multi-tenant inventory management platform that allows multiple companies to manage their logistics and inventory operations independently. The system features secure data isolation between tenants, real-time updates, and QR code integration for efficient transaction logging. Designed to handle high-volume operations with accurate tracking of inbound and outbound goods.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Multi-Tenant", "QR Code", "Logistics"],
    year: 2024,
    category: "web",
    status: "completed"
  }
];

export default ProjectsSection;