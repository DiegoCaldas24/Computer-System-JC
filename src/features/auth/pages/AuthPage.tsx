import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/hooks/useToast";
import { signUp, signIn, createProfile, getProfile } from "../../../services/supabase/auth";

function Eye({ visible }: { visible: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {visible ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );
}

export default function AuthPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );

  const toggle = (id: string) =>
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));

  const inputClass =
    "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email || !password) {
      toast("Completa todos los campos", "warning");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (!result.session) throw new Error("No se pudo iniciar sesión");
      toast("Inicio de sesión exitoso", "success");
      try {
        const profile = await getProfile(result.session.user.id);
        navigate(Number(profile.rol_id) === 1 ? "/admin" : "/");
      } catch {
        navigate("/");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      const msg =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      if (msg.toLowerCase().includes("invalid login credentials")) {
        toast("Correo o contraseña incorrectos", "error");
      } else {
        toast(msg, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const password = data.get("password") as string;
    const confirm = data.get("confirm") as string;

    if (!name || !lastName || !email || !password || !confirm) {
      toast("Completa todos los campos obligatorios", "warning");
      return;
    }
    if (password !== confirm) {
      toast("Las contraseñas no coinciden", "warning");
      return;
    }

    setLoading(true);
    try {
      const authResult = await signUp(email, password);
      const user = authResult.user;
      if (!user) throw new Error("No se pudo crear el usuario");

      try {
        await createProfile({
          user_id: user.id,
          first_name: name,
          last_name: lastName,
          email,
          phone: phone || undefined,
          rol_id: 3,
          status: true,
        });
      } catch (profileErr) {
        const msg =
          profileErr instanceof Error
            ? profileErr.message
            : "Error desconocido al crear perfil";
        console.error("Error al crear perfil:", msg);
        toast(`Error al guardar perfil: ${msg}`, "error");
      }
      toast("Registro exitoso. Bienvenido!", "success");
      navigate("/");
    } catch (err) {
      console.error("Error al registrar:", err);
      const msg = err instanceof Error ? err.message : "Error al registrar";
      if (
        msg.toLowerCase().includes("already registered") ||
        msg.toLowerCase().includes("duplicate") ||
        msg.toLowerCase().includes("ya existe")
      ) {
        toast("Este correo electrónico ya está registrado", "warning");
      } else {
        toast(msg, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-[#f4f6fa] px-4 pt-14">
      <div className="bg-white p-8 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] w-full max-w-md">
        <h2 className="text-xl font-bold text-[#081f57] text-center mb-6">
          {isLogin ? "Iniciar Sesión" : "Regístrate"}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className={inputClass}
              required
            />
            <div className="relative mt-3">
              <input
                name="password"
                type={showPasswords.login ? "text" : "password"}
                placeholder="Contraseña"
                className={`${inputClass} pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => toggle("login")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
              >
                <Eye visible={showPasswords.login} />
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1144b5] hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition mt-5 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Iniciar Sesión"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="flex gap-3">
              <input
                name="name"
                placeholder="Nombre"
                className={`${inputClass} flex-1`}
                required
              />
              <input
                name="lastName"
                placeholder="Apellido"
                className={`${inputClass} flex-1`}
                required
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className={`${inputClass} mt-3`}
              required
            />
            <input
              name="phone"
              type="number"
              placeholder="Teléfono (opcional)"
              className={`${inputClass} mt-3`}
            />

            <div className="relative mt-3">
              <input
                name="password"
                type={showPasswords.regPass ? "text" : "password"}
                placeholder="Contraseña"
                className={`${inputClass} pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => toggle("regPass")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
              >
                <Eye visible={showPasswords.regPass} />
              </button>
            </div>

            <div className="relative mt-3">
              <input
                name="confirm"
                type={showPasswords.regConfirm ? "text" : "password"}
                placeholder="Confirmar contraseña"
                className={`${inputClass} pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => toggle("regConfirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
              >
                <Eye visible={showPasswords.regConfirm} />
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1144b5] hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition mt-5 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-black mt-5">
          {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#1144b5] hover:underline bg-transparent border-none cursor-pointer text-sm font-medium"
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
          </button>
        </p>
      </div>
    </div>
  );
}
