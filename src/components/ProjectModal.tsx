import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import FullscreenViewer from "./FullscreenViewer";
import type { Project } from "../data/content";

type ProjectModalProps = {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const total = project.images.length;

  useEffect(() => {
    if (open) setCurrent(0);
  }, [open, project]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); setCurrent((i) => (i + 1) % total); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setCurrent((i) => (i - 1 + total) % total); }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  return (
    <>
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {open && (
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Dialog.Content asChild forceMount>
                  <motion.div
                    className="modal-content"
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ type: "spring", damping: 28, stiffness: 340 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Dialog.Close asChild>
                      <button className="modal-close" aria-label="Закрыть">✕</button>
                    </Dialog.Close>

                    <div className="modal-slider">
                      <div
                        className="modal-track"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                      >
                        {project.images.map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`${project.title} — ${i + 1}`}
                            className="modal-slide"
                            onClick={() => setFullscreen(true)}
                            style={{ cursor: "zoom-in" }}
                          />
                        ))}
                      </div>
                      {total > 1 && (
                        <>
                          <button
                            className="modal-arrow modal-arrow--left"
                            onClick={() => setCurrent((i) => (i - 1 + total) % total)}
                            aria-label="Предыдущее фото"
                          >
                            ‹
                          </button>
                          <button
                            className="modal-arrow modal-arrow--right"
                            onClick={() => setCurrent((i) => (i + 1) % total)}
                            aria-label="Следующее фото"
                          >
                            ›
                          </button>
                        </>
                      )}
                      <div className="modal-dots" role="tablist" aria-label="Слайды">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            className={`modal-dot ${i === current ? "active" : ""}`}
                            onClick={() => setCurrent(i)}
                            role="tab"
                            aria-selected={i === current}
                            aria-label={`Слайд ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="modal-info">
                      <Dialog.Title asChild>
                        <h3>{project.title}</h3>
                      </Dialog.Title>
                      <Dialog.Description asChild>
                        <p>{project.fullDescription}</p>
                      </Dialog.Description>
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <span className="project-tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                      {project.link && project.link !== "#" && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn modal-link-btn">
                          Перейти на сайт →
                        </a>
                      )}
                    </div>
                  </motion.div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Overlay>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
    <FullscreenViewer
      src={project.images[current]}
      alt={`${project.title} — ${current + 1}`}
      open={fullscreen}
      onOpenChange={setFullscreen}
    />
  </>
  );
}
