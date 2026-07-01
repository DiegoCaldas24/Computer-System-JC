import { Link } from "react-router-dom";
import { Icons } from "../../../shared/components/Icons";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-4 pt-14">
        <Icons.ShoppingCar />
        <p className="text-black text-lg">Tu carrito está vacío</p>
        <Link
          to="/products"
          className="bg-[#1144b5] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] pt-14 pb-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Carrito de compras</h1>

      <div className="space-y-3">
        {items.map(({ product, quantity }) => (
          <div
            key={product.product_id}
            className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-contain rounded-lg bg-slate-50"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 truncate">{product.name}</p>
              <p className="text-sm text-black">S/ {product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => updateQuantity(product.product_id, Math.max(1, quantity - 1))}
                className="p-2 text-black hover:bg-slate-100 transition-colors"
              >
                <Icons.Minus />
              </button>
              <span className="px-3 font-semibold text-sm">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.product_id, quantity + 1)}
                className="p-2 text-black hover:bg-slate-100 transition-colors"
              >
                <Icons.Plus />
              </button>
            </div>
            <p className="font-bold text-slate-800 w-24 text-right">
              S/ {(product.price * quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(product.product_id)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <Icons.X />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-slate-200 pt-4 flex items-center justify-between">
        <p className="text-lg font-bold">
          Total: <span className="text-blue-600">S/ {totalPrice.toFixed(2)}</span>
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
          Proceder al pago
        </button>
      </div>
    </div>
  );
}
