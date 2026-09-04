import ChapterLayout from "../components/ChapterLayout";
import { ABOUT_NOTES } from "../data/content";

export default function About() {
  return (
    <ChapterLayout
      id="about"
      label="Chapter I"
      title="Who I Am"
      pageNum="I"
      notes={ABOUT_NOTES}
    >
      <div className="chapter-text">
        <p className="drop-cap">
          Фуллстек-разработчик. TypeScript, React на фронте, Node.js на бэкенде.
        </p>
        <p>
          Каждый день учусь чему-то новому — пробую новые инструменты,
          разбираюсь с архитектурой, читаю чужой код. Не стою на месте, потому
          что в вебе всё быстро меняется.
        </p>
        <p>
          Сейчас фокусируюсь на NextJS и NestJS. Пишу проекты, которые решают
          реальные задачи.
        </p>
      </div>
    </ChapterLayout>
  );
}
