import ChapterLayout from "../components/ChapterLayout";
import GlowCard from "../components/GlowCard";
import { SKILLS, SKILLS_NOTES } from "../data/content";

export default function Skills() {
  return (
    <ChapterLayout id="skills" label="Chapter III" title="Skills" pageNum="III" notes={SKILLS_NOTES}>
      <div className="chapter-text">
        <p>Технологии, с которыми работаю каждый день.</p>
      </div>
      <div className="skills-columns">
        {SKILLS.map((group) => (
          <GlowCard key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </GlowCard>
        ))}
      </div>
    </ChapterLayout>
  );
}
