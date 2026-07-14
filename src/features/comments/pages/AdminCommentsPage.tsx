import { useEffect, useState } from "react";
import { useToast } from "../../../shared/hooks/useToast";
import { Pagination } from "../../../shared/components/Pagination";
import { getSession } from "../../../services/supabase/auth";
import {
  getUnrepliedComments,
  getAllComments,
  replyToComment,
} from "../services/CommentService";
import type { WebsiteComment } from "../types/comment";

export default function AdminCommentsPage() {
  const { toast } = useToast();
  const [comments, setComments] = useState<WebsiteComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unreplied">("unreplied");
  const [page, setPage] = useState(1);
  const [replyModal, setReplyModal] = useState<WebsiteComment | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const pageSize = 10;

  const load = async () => {
    try {
      setLoading(true);
      const data =
        filter === "unreplied"
          ? await getUnrepliedComments()
          : await getAllComments();
      setComments(data);
    } catch {
      toast("Error al cargar comentarios", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleReply = async () => {
    if (!replyModal || !replyText.trim()) return;
    try {
      setSending(true);
      const session = await getSession();
      await replyToComment(
        replyModal.comment_id,
        replyText.trim(),
        session?.user?.id ?? "unknown",
      );
      toast("Respuesta enviada correctamente", "success");
      setReplyModal(null);
      setReplyText("");
      await load();
    } catch {
      toast("Error al enviar respuesta", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Comentarios</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("unreplied")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "unreplied"
                ? "bg-[#1144b5] text-white"
                : "bg-white text-black border border-slate-300 hover:bg-slate-50"
            }`}
          >
            Sin responder
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === "all"
                ? "bg-[#1144b5] text-white"
                : "bg-white text-black border border-slate-300 hover:bg-slate-50"
            }`}
          >
            Todos
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                {["Asunto", "Comentario", "Fecha", "Respuesta", "Acciones"].map(
                  (h) => (
                    <th
                      key={h}
                      className="py-3 px-4 text-sm font-semibold text-black"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-black">
                    Cargando...
                  </td>
                </tr>
              ) : comments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-black">
                    {filter === "unreplied"
                      ? "No hay comentarios sin responder"
                      : "No hay comentarios"}
                  </td>
                </tr>
              ) : (
                comments
                  .slice((page - 1) * pageSize, page * pageSize)
                  .map((c) => (
                    <tr
                      key={c.comment_id}
                      className="border-b border-slate-100 hover:bg-[#f8f8f8]"
                    >
                      <td className="py-3 px-4 font-medium max-w-[150px] truncate">
                        {c.subject}
                      </td>
                      <td className="py-3 px-4 max-w-[250px] truncate">
                        {c.comment}
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        {c.created_at
                          ? new Date(c.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="py-3 px-4">
                        {c.admin_reply ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Respondido
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            Pendiente
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setReplyModal(c);
                            setReplyText(c.admin_reply ?? "");
                          }}
                          className="bg-[#1144b5] hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                        >
                          {c.admin_reply ? "Editar" : "Responder"}
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 pb-2">
          <Pagination
            current={page}
            total={comments.length}
            pageSize={pageSize}
            onChange={setPage}
          />
        </div>
      </div>

      {replyModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setReplyModal(null);
          }}
        >
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Responder comentario</h3>
              <button
                onClick={() => setReplyModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-semibold text-black mb-1">
                {replyModal.subject}
              </p>
              <p className="text-sm text-black">{replyModal.comment}</p>
            </div>

            <label className="block mb-4">
              <span className="text-sm font-medium text-black mb-1 block">
                Tu respuesta
              </span>
              <textarea
                placeholder="Escribe tu respuesta..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition resize-none"
              />
            </label>

            <button
              onClick={handleReply}
              disabled={sending || !replyText.trim()}
              className="w-full bg-[#1144b5] hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2.5 rounded-lg transition text-sm"
            >
              {sending ? "Enviando..." : "Enviar respuesta"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
