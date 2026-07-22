import React, { useState } from "react";
import BottomNavigation from "../../home/components/BottomNavigation";
import HomeHeader from "../../home/components/HomeHeader";
import HomeLayout from "../../home/layouts/HomeLayout";

import CartEmpty from "../components/CartEmpty";
import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import CartHeader from "../components/CartHeader";
import CartLoading from "../components/CartLoading";
import CartExpirationAlert from "../components/CartExpirationAlert";
import CartRecommendationCard from "../components/CartRecommendationCard";
import CartRemoveDialog from "../components/CartRemoveDialog";
import CartCheckoutBar from "../components/CartCheckoutBar";

import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const {
    cart,
    loading,
    saving,
    error,
    successMessage,
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    clear,
    reload,
  } = useCart();

  const [itemToRemove, setItemToRemove] = useState(null);

  async function handleConfirmRemove() {
    if (!itemToRemove) return;
    try {
      await removeItem(itemToRemove.id);
      setItemToRemove(null);
    } catch (err) {
      window.alert("Não foi possível remover o item.");
    }
  }

  const showRecommendation =
    cart &&
    cart.items.length > 0 &&
    !cart.items.some((item) => item.productId === "museu-oscar-niemeyer");

  return (
    <HomeLayout
      header={<HomeHeader />}
      bottomNavigation={<BottomNavigation />}
    >
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 select-none text-left">
        <CartHeader
          itemsCount={itemCount}
          onClear={clear}
          saving={saving}
        />

        {cart?.expiresAt && (
          <CartExpirationAlert
            expiresAt={cart.expiresAt}
            onExpire={() => {
              clear();
              window.alert("Sua reserva temporária expirou. O carrinho foi esvaziado.");
            }}
          />
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700 animate-fade-in"
          >
            {successMessage}
          </div>
        )}

        {loading ? (
          <CartLoading />
        ) : !cart?.items?.length ? (
          <CartEmpty />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <section className="space-y-4">
              <p className="text-sm font-medium text-slate-500 my-0">
                {cart.items.length} item{cart.items.length === 1 ? "" : "s"} no carrinho
              </p>

              {cart.items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  saving={saving}
                  onQuantityChange={updateQuantity}
                  onRemove={setItemToRemove}
                />
              ))}

              {showRecommendation && (
                <CartRecommendationCard
                  onAddRecommended={(recItem) => {
                    addItem(recItem).catch((err) =>
                      window.alert(err.message || "Erro ao adicionar recomendação.")
                    );
                  }}
                />
              )}
            </section>

            <CartSummary
              cart={cart}
              saving={saving}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
            />
          </div>
        )}
      </div>

      <CartCheckoutBar
        total={cart?.pricing?.total || 0}
        itemCount={itemCount}
      />

      {itemToRemove && (
        <CartRemoveDialog
          isOpen={!!itemToRemove}
          item={itemToRemove}
          onConfirm={handleConfirmRemove}
          onClose={() => setItemToRemove(null)}
          saving={saving}
        />
      )}
    </HomeLayout>
  );
}
