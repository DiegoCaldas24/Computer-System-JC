import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicComments } from "../services/CommentService";
import type { WebsiteComment } from "../types/comment";

export function PublicCommentsSection() {
  const [comments, setComments] = useState<WebsiteComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicComments(4)
      .then(setComments)
      .catch((err) => console.error("PublicCommentsSection error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (comments.length === 0) return null;

  return (
    <section className="bg-[#f8fafc] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0b1f3a]">
            Lo que dicen nuestros clientes
          </h2>
          <div className="w-20 h-1 bg-[#0088d2] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {comments.map((c) => (
            <div
              key={c.comment_id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="inline-block bg-[#0088d2]/10 text-[#0088d2] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {c.subject}
                </span>
              </div>
              <p className="text-black text-sm leading-relaxed mb-3">
                {c.comment}
              </p>
              <div className="flex items-start gap-2.5 p-4 bg-[#1144b5]/5 rounded-xl border border-[#1144b5]/10">
                <svg className="w-5 h-5 text-[#1144b5] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-sm text-black leading-relaxed">
                  {c.admin_reply}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/comentarios"
            className="inline-flex items-center gap-2 bg-[#0088d2] hover:bg-[#169de7] text-white font-semibold px-6 py-3 rounded-lg transition text-sm"
          >
            Ver todos los comentarios
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
