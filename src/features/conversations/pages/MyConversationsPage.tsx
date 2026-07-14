import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSession } from "../../../services/supabase/auth";
import { getUserConversations } from "../services/ConversationService";
import { getMessages, sendMessage } from "../services/MessageService";
import { useToast } from "../../../shared/hooks/useToast";
import type { Conversation, Message } from "../types/conversation";

const STATUS_BADGE: Record<string, string> = {
  Abierta: "bg-yellow-100 text-yellow-700",
  "En proceso": "bg-blue-100 text-blue-700",
  Cerrada: "bg-green-100 text-green-700",
};

export default function MyConversationsPage() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const session = await getSession();
        if (!session?.user) return;
        setUserId(session.user.id);
        const data = await getUserConversations(session.user.id);
        setConversations(data);
      } catch (err) {
        console.error("Error loading conversations:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!selected) return;
    getMessages(selected).then(setMessages).catch((err) => console.error("Error loading messages:", err));
  }, [selected]);

  if (!userId) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-4 pt-14">
        <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-black text-lg">Inicia sesión para ver tus consultas</p>
        <Link to="/login" className="bg-[#0088d2] hover:bg-[#169de7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  const selectedConv = conversations.find((c) => c.conversation_id === selected);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] pt-14 pb-20 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0b1f3a] mb-6 pt-8">
          Mis consultas
        </h1>

        {loading ? (
          <p className="text-black text-center py-16">Cargando...</p>
        ) : conversations.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-black text-lg mb-4">No tienes consultas aún</p>
            <Link to="/repairs" className="text-[#0088d2] font-medium hover:underline">
              Contáctanos
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden md:flex min-h-[500px]">
            {/* Lista de conversaciones */}
            <div className="md:w-80 border-r border-slate-200 shrink-0 overflow-y-auto max-h-[500px] md:max-h-none">
              {conversations.map((c) => (
                <button
                  key={c.conversation_id}
                  onClick={() => setSelected(c.conversation_id)}
                  className={`w-full text-left px-4 py-3.5 border-b border-slate-100 transition-colors ${
                    selected === c.conversation_id
                      ? "bg-[#0088d2]/5 border-l-4 border-l-[#0088d2]"
                      : "hover:bg-slate-50 border-l-4 border-l-transparent"
                  }`}
                >
                  <p className="text-sm font-semibold text-black truncate">{c.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[c.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {c.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(c.updated_at).toLocaleDateString("es-PE", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Hilo de mensajes */}
            <div className="flex-1 flex flex-col">
              {!selectedConv ? (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm p-8">
                  Selecciona una consulta para ver los mensajes
                </div>
              ) : (
                <>
                  <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-base font-bold text-[#0b1f3a]">{selectedConv.subject}</h2>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[selectedConv.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {selectedConv.status}
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[360px]">
                    {messages.length === 0 ? (
                      <p className="text-slate-400 text-sm text-center py-8">No hay mensajes</p>
                    ) : (
                      messages.map((m) => {
                        const isOwn = m.sender_id === userId;
                        return (
                          <div key={m.message_id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                isOwn
                                  ? "bg-[#0088d2] text-white rounded-br-md"
                                  : "bg-slate-100 text-black rounded-bl-md"
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                              <p className={`text-[10px] mt-1 ${isOwn ? "text-white/70" : "text-slate-400"}`}>
                                {new Date(m.created_at).toLocaleString("es-PE", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  day: "numeric",
                                  month: "short",
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {selectedConv.status !== "Cerrada" && (
                    <div className="border-t border-slate-200 p-4 bg-white">
                      <div className="flex gap-2">
                        <textarea
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="Escribe tu respuesta..."
                          rows={2}
                          className="flex-1 resize-none border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0088d2]/40"
                        />
                        <button
                          onClick={async () => {
                            if (!selected || !reply.trim() || sending) return;
                            setSending(true);
                            try {
                              await sendMessage(selected, userId, reply.trim());
                              setReply("");
                              const updated = await getMessages(selected);
                              setMessages(updated);
                            } catch {
                              toast("Error al enviar mensaje", "error");
                            } finally {
                              setSending(false);
                            }
                          }}
                          disabled={sending || !reply.trim()}
                          className="self-end bg-[#0088d2] hover:bg-[#169de7] disabled:bg-slate-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition shrink-0"
                        >
                          {sending ? "Enviando..." : "Enviar"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
