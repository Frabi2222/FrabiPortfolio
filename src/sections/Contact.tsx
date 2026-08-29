import { useState } from "react";
import ChapterLayout from "../components/ChapterLayout";
import GlowCard from "../components/GlowCard";
import ContactModal from "../components/ContactModal";

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ChapterLayout id="contact" label="Chapter IV" title="Contact" pageNum="IV">
      <div className="colophon-text">
        <GlowCard>
          <p>
            Расскажите о задаче — вместе подберём решение. Отвечаю в течение
            дня.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => setModalOpen(true)}
          >
            Написать →
          </button>
        </GlowCard>
      </div>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </ChapterLayout>
  );
}
