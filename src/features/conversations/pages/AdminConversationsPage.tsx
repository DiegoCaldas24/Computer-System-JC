import { useEffect, useState } from "react";
import { useToast } from "../../../shared/hooks/useToast";
import { getSession } from "../../../services/supabase/auth";
import {
  getAllConversations,
  updateConversationStatus,
} from "../services/ConversationService";
import { getMessages, sendMessage } from "../services/MessageService";
import type { Conversation, Message } from "../types/conversation";

const STATUS_BADGE: Record<string, string> = {
  Abierta: "bg-yellow-100 text-yellow-700",
  "En proceso": "bg-blue-100 text-blue-700",
  Cerrada: "bg-green-100 text-green-700",
};

const STATUSES = ["Abierta", "En proceso", "Cerrada"];

export default function AdminConversationsPage() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllConversations();
      setConversations(data);
    } catch (err) {
      console.error("Error loading conversations:", err);
      toast("Error al cargar conversaciones", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!selected) return;
    getMessages(selected).then(setMessages).catch(() => {});
  }, [selected]);

  const handleSendReply = async () => {
    if (!selected || !reply.trim()) return;
    try {
      setSending(true);
      const session = await getSession();
      await sendMessage(selected, session?.user?.id ?? "unknown", reply.trim());
      await updateConversationStatus(selected, "En proceso");
      setReply("");
      const updated = await getMessages(selected);
      setMessages(updated);
      await load();
    } catch {
      toast("Error al enviar mensaje", "error");
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateConversationStatus(id, status);
      await load();
      toast("Estado actualizado", "success");
    } catch {
      toast("Error al actualizar estado", "error");
    }
  };

  const selectedConv = conversations.find((c) => c.conversation_id === selected);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Conversaciones</h1>

      {loading ? (
        <p className="text-black">Cargando...</p>
      ) : conversations.length === 0 ? (
        <p className="text-black">No hay conversaciones</p>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex min-h-[600px]">
          {/* Sidebar */}
          <div className="w-72 border-r border-slate-200 shrink-0 overflow-y-auto max-h-[600px]">
            {conversations.map((c) => (
              <button
                key={c.conversation_id}
                onClick={() => setSelected(c.conversation_id)}
                className={`w-full text-left px-4 py-3.5 border-b border-slate-100 transition-colors ${
                  selected === c.conversation_id
                    ? "bg-[#1144b5]/5 border-l-4 border-l-[#1144b5]"
                    : "hover:bg-slate-50 border-l-4 border-l-transparent"
                }`}
              >
                <p className="text-sm font-semibold text-black truncate">{c.subject}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  ID: {c.user_id?.slice(0, 8)}...
                </p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[c.status] ?? ""}`}>
                  {c.status}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {!selectedConv ? (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                Selecciona una conversación
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#0b1f3a]">{selectedConv.subject}</h2>
                    <p className="text-xs text-slate-500">
                      ID: {selectedConv.user_id?.slice(0, 8)}...
                    </p>
                  </div>
                  <select
                    value={selectedConv.status}
                    onChange={(e) => handleStatusChange(selected!, e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#1144b5] bg-white"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[400px]">
                  {messages.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-8">No hay mensajes aún</p>
                  ) : (
                    messages.map((m) => {
                      const isAdmin = m.sender_id !== selectedConv.user_id;
                      return (
                        <div key={m.message_id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                              isAdmin
                                ? "bg-[#1144b5] text-white rounded-br-md"
                                : "bg-slate-100 text-black rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm font-semibold mb-1 text-inherit opacity-70 text-[11px]">
                              {isAdmin ? "Tú" : "Cliente"}
                            </p>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                            <p className={`text-[10px] mt-1 ${isAdmin ? "text-white/70" : "text-slate-400"}`}>
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

                {/* Reply */}
                {selectedConv.status !== "Cerrada" && (
                  <div className="border-t border-slate-200 p-4">
                    <textarea
                      placeholder="Escribe tu respuesta..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      rows={3}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#1144b5] transition resize-none mb-3"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={sending || !reply.trim()}
                      className="bg-[#1144b5] hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold px-5 py-2 rounded-lg transition text-sm"
                    >
                      {sending ? "Enviando..." : "Responder"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
