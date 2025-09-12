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
    <section className={`w-full max-w-6xl mx-auto py-16 px-4 ${className}`}>
      <h2 className="text-3xl font-bold mb-12 text-center text-primary neon-text">
        {title}
      </h2>
      <div className="relative">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
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
        <Card key={category} className="cyberpunk-border bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-secondary capitalize text-xl">
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(skills) && skills.map((skill: any) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span>{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
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
    return <div className="text-center text-muted-foreground">No certifications available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((cert: any, index: number) => (
        <Card key={index} className="cyberpunk-border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden cyberpunk-border flex-shrink-0">
                <img
                  src={cert.badgeUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-secondary mb-2">{cert.title}</h3>
                <p className="text-primary text-sm mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {cert.organization}
                </p>
                <p className="text-muted-foreground text-sm mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {cert.date}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                    {cert.level}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Verify
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ID: {cert.credentialId}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ExperienceContent = ({ data = [] }: { data: any }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-muted-foreground">No experience data available</div>;
  }

  return (
    <div className="space-y-8">
      {data.map((exp: any, index: number) => (
        <Card key={index} className="cyberpunk-border bg-card/30 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">{exp.title}</h3>
                    <p className="text-primary font-medium flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-accent text-accent mt-2 sm:mt-0">
                    {exp.period}
                  </Badge>
                </div>
                
                <p className="text-foreground/90 mb-4 leading-relaxed">{exp.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-secondary mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(exp.technologies) && exp.technologies.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {exp.achievements && Array.isArray(exp.achievements) && (
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const EducationContent = ({ data = [] }: { data: any }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-muted-foreground">No education data available</div>;
  }

  return (
    <div className="space-y-8">
      {data.map((edu: any, index: number) => (
        <Card key={index} className="cyberpunk-border bg-card/30 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">{edu.degree}</h3>
                    <p className="text-primary font-medium flex items-center gap-2 mb-1">
                      <GraduationCap className="w-4 h-4" />
                      {edu.institution}
                    </p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {edu.location}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-accent text-accent mt-2 sm:mt-0">
                    {edu.period}
                  </Badge>
                </div>
                
                <p className="text-foreground/90 mb-4 leading-relaxed">{edu.description}</p>
                
                {edu.coursework && Array.isArray(edu.coursework) && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-secondary mb-2">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course: string) => (
                        <Badge key={course} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {edu.achievements && Array.isArray(edu.achievements) && (
                  <div>
                    <h4 className="text-sm font-semibold text-secondary mb-2">Achievements:</h4>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentSection;