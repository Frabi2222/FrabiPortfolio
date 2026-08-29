import { useState, useEffect, useRef } from "react";

const ACCESS_KEY = "04c6fe15-cb74-44a7-9ed9-d0ccde3e6d7c";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setForm({ name: "", email: "", subject: "", message: "" });
      setSent(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || `Письмо от ${form.name}`,
          message: form.message,
          from_name: "Portfolio",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError("Ошибка отправки. Попробуйте позже.");
      }
    } catch {
      setError("Ошибка сети. Проверьте подключение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Написать"
    >
      <div className="modal-content" style={{ maxWidth: 480, padding: 0 }}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        <div style={{ padding: 28 }}>
          {sent ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                padding: "40px 0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  lineHeight: 1,
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 24,
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--accent)",
                }}
              >
                Отправлено!
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  maxWidth: "36ch",
                }}
              >
                Спасибо за сообщение. Я отвечу вам на почту в ближайшее время.
              </p>
              <button
                className="btn primary"
                onClick={onClose}
                style={{ marginTop: 8 }}
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <h3
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 24,
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--accent)",
                  marginBottom: 20,
                }}
              >
                Написать мне
              </h3>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <InputField
                    label="Имя"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Ваше имя"
                  />
                  <InputField
                    label="Почта"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <InputField
                  label="Тема"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Тема сообщения"
                />

                <div>
                  <label
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Расскажите о задаче..."
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      fontFamily: "var(--sans)",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--ink)",
                      background: "transparent",
                      border: "1px solid var(--line-strong)",
                      borderRadius: 0,
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--line-strong)")
                    }
                  />
                </div>

                {error && (
                  <p style={{ fontSize: 13, color: "#c0392b" }}>{error}</p>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                    paddingTop: 4,
                  }}
                >
                  <button type="button" className="btn" onClick={onClose}>
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="btn primary"
                    disabled={loading}
                    style={{ opacity: loading ? 0.6 : 1 }}
                  >
                    {loading ? "Отправка..." : "Отправить →"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        style={{
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          display: "block",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          fontFamily: "var(--sans)",
          fontSize: 14,
          color: "var(--ink)",
          background: "transparent",
          border: "1px solid var(--line-strong)",
          borderRadius: 0,
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--line-strong)")
        }
      />
    </div>
  );
}
