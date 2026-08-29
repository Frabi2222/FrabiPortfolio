import { type ReactNode } from "react";
import type { MarginNote as MarginNoteType } from "../data/content";

type ChapterLayoutProps = {
  id: string;
  label: string;
  title: string;
  pageNum: string;
  notes?: MarginNoteType[];
  children: ReactNode;
};

export default function ChapterLayout({
  id,
  label,
  title,
  pageNum,
  notes,
  children,
}: ChapterLayoutProps) {
  return (
    <section className="chapter" id={id}>
      <div className="container">
        <div className="chapter-layout">
          <div className="chapter-main">
            <span className="chapter-num">{label}</span>
            <h2 className="chapter-title">{title}</h2>
            <div className="chapter-rule" />
            {children}
          </div>
          {notes && notes.length > 0 && (
            <MarginNotes notes={notes} />
          )}
        </div>
        <div className="page-num">{pageNum}</div>
      </div>
    </section>
  );
}

function MarginNotes({ notes }: { notes: MarginNoteType[] }) {
  return (
    <div className="margin-notes">
      {notes.map((n) => (
        <div className="margin-note" key={n.label}>
          <span className="note-label">{n.label}</span>
          {n.text}
        </div>
      ))}
    </div>
  );
}
