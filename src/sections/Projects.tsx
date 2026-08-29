import { useState, useCallback } from "react";
import ChapterLayout from "../components/ChapterLayout";
import GlowCard from "../components/GlowCard";
import ProjectModal from "../components/ProjectModal";
import { PROJECTS, PROJECT_NOTES } from "../data/content";
import type { Project } from "../data/content";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const openProject = useCallback((project: Project) => {
    setSelected(project);
    setOpen(true);
  }, []);

  return (
    <ChapterLayout id="projects" label="Chapter II" title="Projects" pageNum="II" notes={PROJECT_NOTES}>
      <div className="chapter-text">
        <p>Каждый проект — отдельная история решения.</p>
      </div>
      <div className="projects-list">
        {PROJECTS.map((project) => (
          <GlowCard key={project.title}>
            <div
              className="project-card-body"
              onClick={() => openProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openProject(project)}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project-link">Открыть проект →</span>
            </div>
          </GlowCard>
        ))}
      </div>
      {selected && (
        <ProjectModal project={selected} open={open} onOpenChange={setOpen} />
      )}
    </ChapterLayout>
  );
}
