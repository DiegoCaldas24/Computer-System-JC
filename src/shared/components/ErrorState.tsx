interface Props {
  message?: string;
}

export function ErrorState({ message = "Error al cargar los datos" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <span className="text-red-500 text-2xl font-bold">!</span>
      </div>
      <p className="text-red-600 font-semibold text-lg">{message}</p>
      <p className="text-slate-400 text-sm mt-2">Intenta recargar la página más tarde.</p>
    </div>
  );
}