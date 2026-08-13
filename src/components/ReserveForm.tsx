import { useState, type FormEvent } from "react";
import { CONTACTS } from "@/data/contacts";

const TODAY = () => new Date().toISOString().split("T")[0];

export default function ReserveForm({ context = "table" }: { context?: "table" | "event" }) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const date = data.get("date");
    const guests = data.get("guests");
    const comment = data.get("comment");

    const lines = [
      context === "table" ? "Заявка на бронь столика:" : "Заявка на мероприятие:",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Дата: ${date}`,
      `Гостей: ${guests}`,
      comment ? `Комментарий: ${comment}` : null,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`${CONTACTS.whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-obsidian-line px-8 py-10 text-center">
        <p className="font-display text-2xl text-ivory">Заявка отправлена в WhatsApp</p>
        <p className="mt-3 text-sm text-ivory-dim">
          Если чат не открылся автоматически, позвоните нам напрямую — мы свяжемся с вами, чтобы подтвердить{" "}
          {context === "table" ? "бронь столика" : "детали мероприятия"}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="eyebrow">Имя</span>
          <input
            required
            name="name"
            type="text"
            className="border border-obsidian-line bg-transparent px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-brass"
            placeholder="Как к вам обращаться"
          />
        </label>
        <label className="grid gap-2">
          <span className="eyebrow">Телефон</span>
          <input
            required
            name="phone"
            type="tel"
            pattern="^[+0-9()\s-]{10,18}$"
            title="Введите номер телефона, например +7 (999) 123-45-67"
            className="border border-obsidian-line bg-transparent px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-brass"
            placeholder="+7"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="eyebrow">Дата</span>
          <input
            required
            name="date"
            type="date"
            min={TODAY()}
            className="border border-obsidian-line bg-transparent px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-brass"
          />
        </label>
        <label className="grid gap-2">
          <span className="eyebrow">Гостей</span>
          <input
            required
            name="guests"
            type="number"
            min={1}
            className="border border-obsidian-line bg-transparent px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-brass"
            placeholder="Число гостей"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="eyebrow">Комментарий</span>
        <textarea
          name="comment"
          rows={3}
          className="border border-obsidian-line bg-transparent px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-brass"
          placeholder={context === "table" ? "Пожелания к столику" : "Формат мероприятия, зал"}
        />
      </label>

      <button type="submit" className="btn-brass mt-2 w-fit">
        <span>Отправить заявку</span>
      </button>
    </form>
  );
}
