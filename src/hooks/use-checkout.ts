import { useState } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/useCartStore";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "cod" | "card";
}

export function useCheckout() {
  const { cart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  // Calculate Subtotal & Total
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 0 ? 120 : 0; // Standard Shipping Fee
  const totalPrice = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    // Simulate API process
    setTimeout(() => {
      setLoading(false);
      toast.success("Order placed successfully!");
      clearCart();
    }, 1500);
  };

  return {
    cart,
    formData,
    loading,
    subtotal,
    shippingFee,
    totalPrice,
    handleInputChange,
    handleSubmit,
  };
}