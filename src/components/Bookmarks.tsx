import { BOOKMARKS } from "../data/content";

export default function Bookmarks() {
  return (
    <nav className="bookmarks" aria-label="Навигация по главам">
      {BOOKMARKS.map((b) => (
        <a key={b.label} href={b.href} className="bookmark">
          {b.label}
        </a>
      ))}
    </nav>
  );
}
