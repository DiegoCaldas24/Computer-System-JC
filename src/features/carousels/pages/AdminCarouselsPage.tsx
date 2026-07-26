import { useEffect, useState } from "react";
import { Icons } from "../../../shared/components/Icons";
import { useToast } from "../../../shared/hooks/useToast";
import {
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} from "../services/CarouselService";
import { CAROUSEL_SECTIONS } from "../types/carousel";
import type { CarouselSlide } from "../types/carousel";

export default function AdminCarouselsPage() {
  const { toast } = useToast();
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>(CAROUSEL_SECTIONS[0].key);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const load = async () => {
    try {
      const data = await getAllSlides();
      setSlides(data);
    } catch {
      toast("Error al cargar diapositivas", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const sectionSlides = slides.filter((s) => s.section === activeTab);

  const openAdd = () => {
    setEditing(null);
    setImageUrl("");
    setTitle("");
    setDescription("");
    setLink("");
    setShowModal(true);
  };

  const openEdit = (slide: CarouselSlide) => {
    setEditing(slide.id);
    setImageUrl(slide.image_url);
    setTitle(slide.title ?? "");
    setDescription(slide.description ?? "");
    setLink(slide.link ?? "");
    setShowModal(true);
  };

  const save = async () => {
    if (!imageUrl.trim()) {
      toast("La URL de la imagen es obligatoria", "warning");
      return;
    }
    try {
      if (editing) {
        await updateSlide(editing, {
          image_url: imageUrl.trim(),
          title: title.trim() || null,
          description: description.trim() || null,
          link: link.trim() || null,
        });
        toast("Diapositiva actualizada", "success");
      } else {
        await createSlide(
          activeTab,
          imageUrl.trim(),
          title.trim() || undefined,
          description.trim() || undefined,
          link.trim() || undefined,
        );
        toast("Diapositiva creada", "success");
      }
      setShowModal(false);
      await load();
    } catch {
      toast("Error al guardar diapositiva", "error");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar esta diapositiva?")) return;
    try {
      await deleteSlide(id);
      toast("Diapositiva eliminada", "success");
      await load();
    } catch {
      toast("Error al eliminar diapositiva", "error");
    }
  };

  const toggleActive = async (slide: CarouselSlide) => {
    try {
      await updateSlide(slide.id, { is_active: !slide.is_active });
      await load();
    } catch {
      toast("Error al actualizar", "error");
    }
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const current = [...sectionSlides];
    [current[index - 1], current[index]] = [current[index], current[index - 1]];
    await Promise.all(
      current.map((s, i) => updateSlide(s.id, { sort_order: i })),
    );
    await load();
  };

  const moveDown = async (index: number) => {
    if (index === sectionSlides.length - 1) return;
    const current = [...sectionSlides];
    [current[index], current[index + 1]] = [current[index + 1], current[index]];
    await Promise.all(
      current.map((s, i) => updateSlide(s.id, { sort_order: i })),
    );
    await load();
  };

  const visibleCount = sectionSlides.filter((s) => s.is_active).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Carruseles</h1>
        <button
          onClick={openAdd}
          className="bg-[#1144b5] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
        >
          <Icons.Plus /> Añadir diapositiva
        </button>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {CAROUSEL_SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveTab(s.key)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === s.key
                ? "bg-[#1144b5] text-white"
                : "bg-white text-black border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        {loading ? (
          <p className="text-black text-center py-8">Cargando...</p>
        ) : sectionSlides.length === 0 ? (
          <p className="text-black text-center py-8">
            No hay diapositivas en esta sección. Haz clic en "Añadir diapositiva" para agregar una.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                {["Orden", "Vista previa", "URL", "Título", "Estado", "Acciones"].map((h) => (
                  <th key={h} className="py-3 px-4 text-sm font-semibold text-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectionSlides.map((slide, i) => (
                <tr key={slide.id} className="border-b border-slate-100 hover:bg-[#f8f8f8]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveUp(i)} disabled={i === 0} className="text-slate-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed">
                        <Icons.ChevronUp />
                      </button>
                      <span className="text-xs text-slate-400 w-4 text-center">{i + 1}</span>
                      <button onClick={() => moveDown(i)} disabled={i === sectionSlides.length - 1} className="text-slate-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed">
                        <Icons.ChevronDown />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={slide.image_url}
                      alt=""
                      className="w-20 h-14 object-cover rounded border"
                    />
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-sm text-slate-500">
                    {slide.image_url}
                  </td>
                  <td className="py-3 px-4 text-sm">{slide.title ?? "—"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleActive(slide)}
                      className={`px-2 py-1 rounded text-xs font-medium transition ${
                        slide.is_active
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {slide.is_active ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(slide)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => remove(slide.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-3">
        {visibleCount} diapositiva{visibleCount !== 1 ? "s" : ""} activa{visibleCount !== 1 ? "s" : ""} de {sectionSlides.length} en "{CAROUSEL_SECTIONS.find((s) => s.key === activeTab)?.label}"
      </p>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 shadow-2xl">
            <h2 className="text-lg font-bold mb-4">
              {editing ? "Editar diapositiva" : "Nueva diapositiva"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">URL de la imagen *</label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.webp"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1144b5]/40"
                />
              </div>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-contain rounded border bg-slate-50"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Opcional"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1144b5]/40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Opcional"
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1144b5]/40 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Enlace</label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="/products o https://..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1144b5]/40"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={save}
                className="bg-[#1144b5] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                {editing ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
