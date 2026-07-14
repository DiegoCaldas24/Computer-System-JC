import { useState } from "react";
import { getSession } from "../../../services/supabase/auth";
import { createComment } from "../services/CommentService";
import { useToast } from "../../../shared/hooks/useToast";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CommentModal({ open, onClose }: Props) {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [type, setType] = useState("publico");
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !comment.trim()) {
      toast("Completa todos los campos", "warning");
      return;
    }

    try {
      setSending(true);
      const session = await getSession();
      if (!session?.user) {
        toast("Debes iniciar sesión para dejar un comentario", "warning");
        return;
      }

      await createComment({
        user_id: session.user.id,
        subject: subject.trim(),
        comment: comment.trim(),
        type,
      });

      toast("Comentario enviado correctamente", "success");
      setSubject("");
      setComment("");
      setType("público");
      onClose();
    } catch {
      toast("Error al enviar el comentario", "error");
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
          <h3 className="text-xl font-bold text-[#0b1f3a]">Deja tu comentario</h3>
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
              <option value="Sugerencia">Sugerencia</option>
              <option value="Consulta">Consulta</option>
              <option value="Queja">Queja</option>
              <option value="Opinión">Opinión</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Visibilidad</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="publico"
                  checked={type === "publico"}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-[#0088d2] w-4 h-4"
                />
                <span className="text-sm text-black">Público</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="privado"
                  checked={type === "privado"}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-[#0088d2] w-4 h-4"
                />
                <span className="text-sm text-black">Privado</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Comentario</label>
            <textarea
              placeholder="Escribe tu comentario aquí..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition resize-none"
              maxLength={500}
            />
            <p className="text-xs text-slate-400 mt-1 text-right">{comment.length}/500</p>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-[#0088d2] hover:bg-[#169de7] disabled:bg-slate-400 text-white font-semibold py-2.5 rounded-lg transition text-sm"
          >
            {sending ? "Enviando..." : "Enviar comentario"}
          </button>
        </form>
      </div>
    </div>
  );
}
