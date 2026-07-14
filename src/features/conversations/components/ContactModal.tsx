import { useState } from "react";
import { getSession } from "../../../services/supabase/auth";
import { createConversation } from "../services/ConversationService";
import { sendMessage } from "../services/MessageService";
import { useToast } from "../../../shared/hooks/useToast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SUBJECTS = [
  "Cotización / Presupuesto",
  "Consulta técnica",
  "Soporte / Reparación",
  "Garantía",
  "Pedido / Envío",
  "Sugerencia",
  "Reclamo",
  "Otro",
];

export function ContactModal({ open, onClose }: Props) {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast("Completa todos los campos", "warning");
      return;
    }

    try {
      setSending(true);
      const session = await getSession();
      if (!session?.user) {
        toast("Debes iniciar sesión para enviar una consulta", "warning");
        return;
      }

      const convId = await createConversation(session.user.id, subject.trim());
      await sendMessage(convId, session.user.id, message.trim());

      toast("Consulta enviada correctamente", "success");
      setSubject("");
      setMessage("");
      onClose();
    } catch (err) {
      console.error("ContactModal error:", err);
      toast("Error al enviar la consulta", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#0b1f3a]">Contáctanos</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Asunto</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition bg-white"
            >
              <option value="">Selecciona un asunto...</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Mensaje</label>
            <textarea
              placeholder="Escribe tu consulta aquí..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-slate-400 mt-1 text-right">{message.length}/1000</p>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-[#0088d2] hover:bg-[#169de7] disabled:bg-slate-400 text-white font-semibold py-2.5 rounded-lg transition text-sm"
          >
            {sending ? "Enviando..." : "Enviar consulta"}
          </button>
        </form>
      </div>
    </div>
  );
}
