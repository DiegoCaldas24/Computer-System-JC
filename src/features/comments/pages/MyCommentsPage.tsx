import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSession } from "../../../services/supabase/auth";
import { getCommentsByUser } from "../services/CommentService";
import type { WebsiteComment } from "../types/comment";

export default function MyCommentsPage() {
  const [comments, setComments] = useState<WebsiteComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const session = await getSession();
        if (!session?.user) return;
        setUserId(session.user.id);
        const data = await getCommentsByUser(session.user.id);
        setComments(data);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!userId) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-4 pt-14">
        <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-black text-lg">Inicia sesión para ver tus comentarios</p>
        <Link to="/login" className="bg-[#0088d2] hover:bg-[#169de7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] pt-14 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0b1f3a] mb-8">
          Mis comentarios
        </h1>

        {loading ? (
          <p className="text-black text-center py-12">Cargando...</p>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-black text-lg mb-4">No has enviado ningún comentario aún</p>
            <Link to="/" className="text-[#0088d2] font-medium hover:underline">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.comment_id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="inline-block bg-[#0088d2]/10 text-[#0088d2] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {c.subject}
                    </span>
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                      c.admin_reply
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.admin_reply ? "Respondido" : "Pendiente"}
                  </span>
                </div>

                <p className="text-black text-sm leading-relaxed mb-3">
                  {c.comment}
                </p>

                <p className="text-xs text-slate-400">
                  {c.created_at
                    ? new Date(c.created_at).toLocaleDateString("es-PE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>

                {c.admin_reply && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#1144b5]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-[#1144b5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-[#1144b5] mb-1">Respuesta del administrador</p>
                        <p className="text-sm text-black leading-relaxed">{c.admin_reply}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
