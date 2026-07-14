import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicCommentsWithReplies } from "../services/CommentService";
import type { WebsiteComment } from "../types/comment";

export default function PublicCommentsPage() {
  const [comments, setComments] = useState<WebsiteComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicCommentsWithReplies()
      .then(setComments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] pt-14 pb-20 px-4 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#0b1f3a] mb-4">
            Comentarios de nuestros clientes
          </h1>
          <div className="w-20 h-1 bg-[#0088d2] mx-auto rounded-full" />
        </div>

        {loading ? (
          <p className="text-black text-center py-16">Cargando...</p>
        ) : comments.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-black text-lg mb-4">No hay comentarios públicos aún</p>
            <Link to="/" className="text-[#0088d2] font-medium hover:underline">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((c) => (
              <div
                key={c.comment_id}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-start gap-2 mb-4">
                  <span className="inline-block bg-[#0088d2]/10 text-[#0088d2] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {c.subject}
                  </span>
                </div>

                <p className="text-black leading-relaxed mb-4">
                  {c.comment}
                </p>

                <p className="text-xs text-slate-400 mb-4">
                  {c.created_at
                    ? new Date(c.created_at).toLocaleDateString("es-PE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>

                <div className="flex items-start gap-3 p-4 md:p-5 bg-[#1144b5]/5 rounded-xl border border-[#1144b5]/10">
                  <svg className="w-5 h-5 text-[#1144b5] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-[#1144b5] mb-1">Respuesta del administrador</p>
                    <p className="text-sm text-black leading-relaxed">{c.admin_reply}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
