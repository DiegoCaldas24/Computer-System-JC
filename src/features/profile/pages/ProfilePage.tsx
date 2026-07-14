import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSession, getProfile, getProfileAddress, updateProfile } from "../../../services/supabase/auth";
import { useToast } from "../../../shared/hooks/useToast";

function ConfirmDialog({
  open,
  title,
  message,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-lg font-bold text-[#0b1f3a] mb-2">{title}</h3>
        <p className="text-black text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 border border-slate-300 text-black font-semibold py-2.5 rounded-lg transition text-sm hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#0088d2] hover:bg-[#169de7] disabled:bg-slate-400 text-white font-semibold py-2.5 rounded-lg transition text-sm"
          >
            {loading ? "Guardando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");

  const [confirm, setConfirm] = useState<"personal" | "address" | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const session = await getSession();
        if (!session?.user) return;
        setUserId(session.user.id);

        const profile = await getProfile(session.user.id);
        setEmail(profile.email ?? "");
        setFirstName(profile.first_name ?? "");
        setLastName(profile.last_name ?? "");
        setPhone(profile.phone ?? "");

        const addr = await getProfileAddress(session.user.id);
        setAddress(addr.address ?? "");
        setCity(addr.city ?? "");
        setDepartment(addr.department ?? "");
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSavePersonal = async () => {
    if (!userId) return;
    try {
      setSaving(true);
      await updateProfile(userId, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
      });
      toast("Datos personales actualizados", "success");
      setConfirm(null);
    } catch {
      toast("Error al guardar datos personales", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!userId) return;
    try {
      setSaving(true);
      await updateProfile(userId, {
        address: address.trim(),
        city: city.trim(),
        department: department.trim(),
      });
      toast("Dirección actualizada", "success");
      setConfirm(null);
    } catch {
      toast("Error al guardar dirección", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-4 pt-14">
        <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <p className="text-black text-lg">Inicia sesión para ver tu perfil</p>
        <Link to="/login" className="bg-[#0088d2] hover:bg-[#169de7] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] pt-14 flex items-center justify-center">
        <p className="text-black">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] pt-14 pb-20 px-4 bg-[#f8fafc]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pt-8">
          <div className="w-12 h-12 bg-[#0088d2]/10 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#0088d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0b1f3a]">Mi Perfil</h1>
            <p className="text-black text-sm">Administra tu información personal</p>
          </div>
        </div>

        {/* DATOS PERSONALES */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 mb-6">
          <h2 className="text-lg font-bold text-[#0b1f3a] flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0088d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Datos personales
          </h2>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-slate-50 text-slate-500 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Nombres</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Apellidos</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Número de celular</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition"
            />
          </div>

          <button
            onClick={() => setConfirm("personal")}
            className="w-full bg-[#0088d2] hover:bg-[#169de7] text-white font-semibold py-2.5 rounded-lg transition text-sm"
          >
            Guardar datos personales
          </button>
        </div>

        {/* DIRECCIÓN DE ENVÍO */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#0b1f3a] flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0088d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Dirección de envío
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Av. o Calle, Nro, Urbanización"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Ciudad</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej: Lima"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Departamento</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Ej: Lima"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#0088d2] transition"
              />
            </div>
          </div>

          <button
            onClick={() => setConfirm("address")}
            className="w-full bg-[#0088d2] hover:bg-[#169de7] text-white font-semibold py-2.5 rounded-lg transition text-sm"
          >
            Guardar dirección
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirm === "personal"}
        title="Guardar datos personales"
        message="¿Estás seguro de guardar los cambios en tus datos personales?"
        loading={saving}
        onConfirm={handleSavePersonal}
        onCancel={() => setConfirm(null)}
      />

      <ConfirmDialog
        open={confirm === "address"}
        title="Guardar dirección"
        message="¿Estás seguro de guardar los cambios en tu dirección de envío?"
        loading={saving}
        onConfirm={handleSaveAddress}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}
