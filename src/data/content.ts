import type { StaggeredMenuItem } from "../ui/staggeredMenu";

export type Project = {
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  link: string;
  images: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type MarginNote = {
  label: string;
  text: string;
};

export const menuItems: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Home", link: "#preamble" },
  { label: "Who I Am", ariaLabel: "Who I Am", link: "#about" },
  { label: "Projects", ariaLabel: "Projects", link: "#projects" },
  { label: "Skills", ariaLabel: "Skills", link: "#skills" },
  { label: "Contact", ariaLabel: "Contact", link: "#contact" },
];

export const socialItems = [
  { label: "GitHub", link: "https://github.com/Frabi2222" },
];

export const PROJECTS: Project[] = [
  {
    title: "Recipe Website",
    description: "Полноценное веб-приложение для хранения и поиска рецептов.",
    fullDescription:
      "Полноценное веб-приложение для хранения и поиска рецептов. Регистрация и авторизация, добавление своих рецептов с фото и пошаговым описанием, фильтрация по категориям и ингредиентам. Реализована работа с MongoDB для хранения данных, Express для серверной логики и React для интерфейса.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#",
    images: [
      "https://storage.yandexcloud.net/recipesimage/portfolio-static/recipesite1.png",
      "https://storage.yandexcloud.net/recipesimage/portfolio-static/recipesite2.png",
      "https://storage.yandexcloud.net/recipesimage/portfolio-static/recipesite3.png",
    ],
  },
  {
    title: "Admin Panel",
    description: "Панель управления для сайта.",
    fullDescription:
      "Панель управления для сайта: управление пользователями, контентом и статистикой. Защищённый доступ, динамические таблицы, фильтрация и пагинация данных. Создана на TypeScript, Express и React с акцентом на типизацию и безопасность.",
    tags: ["TypeScript", "Express", "React"],
    link: "#",
    images: [
      "https://storage.yandexcloud.net/recipesimage/portfolio-static/adminpanel1.png",
      "https://storage.yandexcloud.net/recipesimage/portfolio-static/adminpanel2.png",
      "https://storage.yandexcloud.net/recipesimage/portfolio-static/adminpanel3.png",
    ],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "TypeScript",
      "React 19",
      "CSS (Grid, Flexbox, custom properties)",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Инструменты",
    items: ["Vite 8", "Git", "npm", "oxlint"],
  },
];

export const ABOUT_NOTES: MarginNote[] = [
  { label: "Стек", text: "React 19, TS, Node" },
  { label: "База", text: "MongoDB" },
  { label: "Сборка", text: "Vite 8, oxlint" },
];

export const PROJECT_NOTES: MarginNote[] = [
  { label: "Проектов", text: "2 в портфолио" },
  { label: "Стек", text: "React, Node, DB" },
];

export const SKILLS_NOTES: MarginNote[] = [
  { label: "Языки", text: "TypeScript, " },
  { label: "Бэкенд", text: "Express, MongoDB" },
  { label: "Сборка", text: "Vite 8" },
];

export const BOOKMARKS = [
  { label: "I", href: "#about" },
  { label: "II", href: "#projects" },
  { label: "III", href: "#skills" },
  { label: "IV", href: "#contact" },
];
