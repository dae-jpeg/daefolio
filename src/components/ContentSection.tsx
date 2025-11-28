import React from "react";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Calendar, MapPin, Award, Briefcase, GraduationCap } from "lucide-react";

interface ContentSectionProps {
  title: string;
  content?: {
    type: string;
    data: any;
  };
  className?: string;
}

const ContentSection = ({
  title,
  content = { type: "default", data: [] },
  className = "",
}: ContentSectionProps) => {
  const renderContent = () => {
    if (!content || !content.type) {
      return <div className="text-center text-muted-foreground">No content available</div>;
    }

    switch (content.type) {
      case "skills":
        return <SkillsContent data={content.data} />;
      case "certifications":
        return <CertificationsContent data={content.data} />;
      case "experience":
        return <ExperienceContent data={content.data} />;
      case "education":
        return <EducationContent data={content.data} />;
      default:
        return <div className="text-center text-muted-foreground">Content type not supported</div>;
    }
  };

  return (
    <section className={`w-full max-w-6xl mx-auto py-8 sm:py-16 px-2 sm:px-4 ${className}`}>
      {title && (
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-center text-zinc-50 border-b border-zinc-800 pb-2">
          {title}
        </h2>
      )}
      <div className="relative">
        <div className="relative z-10">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

const SkillsContent = ({ data = {} }: { data: any }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center text-muted-foreground">No skills data available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Object.entries(data).map(([category, skills]: [string, any]) => (
        <Card key={category} className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground capitalize text-xl">
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(skills) && skills.map((skill: any) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2 text-foreground">
                      <span>{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const CertificationsContent = ({ data = [] }: { data: any }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-zinc-500 text-xs sm:text-sm">No certifications available</div>;
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {data.map((cert: any, index: number) => (
        <div key={index} className="border-l-2 border-zinc-700 pl-3 sm:pl-4">
          <h3 className="text-xs sm:text-sm font-medium text-zinc-200 break-words">{cert.title}</h3>
          <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1 break-words">{cert.organization}</p>
          <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1 break-words">{cert.date} • {cert.level}</p>
        </div>
      ))}
    </div>
  );
};

const ExperienceContent = ({ data = [] }: { data: any }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-zinc-500 text-xs sm:text-sm">No experience data available</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {data.map((exp: any, index: number) => (
        <div key={index} className="border-l-2 border-zinc-700 pl-3 sm:pl-5 pb-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-zinc-50 mb-1 break-words">{exp.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium break-words">{exp.company}</p>
              <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 break-words">{exp.location}</p>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1 sm:mt-0 flex-shrink-0">{exp.period}</p>
          </div>
          
          {exp.description && (
            <p className="text-xs sm:text-sm text-zinc-300 mb-2 sm:mb-3 leading-relaxed break-words">{exp.description}</p>
          )}
          
          {exp.achievements && Array.isArray(exp.achievements) && (
            <ul className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
              {exp.achievements.map((achievement: string, i: number) => (
                <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-1.5 sm:gap-2">
                  <span className="text-zinc-500 mt-1.5 text-[10px] sm:text-xs flex-shrink-0">•</span>
                  <span className="break-words">{achievement}</span>
                </li>
              ))}
            </ul>
          )}
          
          {exp.technologies && Array.isArray(exp.technologies) && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {exp.technologies.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="text-[10px] sm:text-xs bg-zinc-900 text-zinc-300 border-zinc-800 px-1.5 sm:px-2 py-0.5">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const EducationContent = ({ data = [] }: { data: any }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-zinc-500 text-xs sm:text-sm">No education data available</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {data.map((edu: any, index: number) => (
        <div key={index} className="border-l-2 border-zinc-700 pl-3 sm:pl-5 pb-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-zinc-50 mb-1 break-words">{edu.degree}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium break-words">{edu.institution}</p>
              <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 break-words">{edu.location}</p>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1 sm:mt-0 flex-shrink-0">{edu.period}</p>
          </div>
          
          {edu.description && (
            <p className="text-xs sm:text-sm text-zinc-300 mb-2 sm:mb-3 leading-relaxed break-words">{edu.description}</p>
          )}
          
          {edu.achievements && Array.isArray(edu.achievements) && (
            <ul className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
              {edu.achievements.map((achievement: string, i: number) => (
                <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-1.5 sm:gap-2">
                  <span className="text-zinc-500 mt-1.5 text-[10px] sm:text-xs flex-shrink-0">•</span>
                  <span className="break-words">{achievement}</span>
                </li>
              ))}
            </ul>
          )}
          
          {edu.coursework && Array.isArray(edu.coursework) && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {edu.coursework.map((course: string) => (
                <Badge key={course} variant="secondary" className="text-[10px] sm:text-xs bg-zinc-900 text-zinc-300 border-zinc-800 px-1.5 sm:px-2 py-0.5">
                  {course}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentSection;