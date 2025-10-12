import React, { useEffect, useRef } from 'react';
import { CartItem } from '@/lib/api';
import { CartLineItem } from '@/components/molecules/cart-line-item';
import { Button } from '@/components/atoms/button';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Focus trap management
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      setTimeout(() => closeBtnRef.current?.focus(), 10);
      const onTab = (e: KeyboardEvent) => {
        if (!drawerRef.current) return;
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', onTab);
      document.addEventListener('keydown', onEsc);
      return () => {
        document.removeEventListener('keydown', onTab);
        document.removeEventListener('keydown', onEsc);
      };
    } else {
      previouslyFocusedElement.current?.focus?.();
    }
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const subtotal = items.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
  // For demonstration, same as subtotal; for real: subtotal+tax+shipping
  const total = subtotal;

  // Animation classes
  const visible = isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none';
  const backdropVisible = isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none';

  // Empty state content
  const emptyState = (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <svg width="64" height="64" className="text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <div className="text-gray-700 font-medium mb-2">Your cart is empty</div>
      <Button variant="outline" size="md" onClick={onClose} aria-label="Continue shopping">
        Continue shopping
      </Button>
    </div>
  );

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[1080] bg-black bg-opacity-40 transition-opacity duration-300 ${backdropVisible}`}
        aria-hidden={!isOpen}
        onClick={handleBackdrop}
        tabIndex={-1}
      />
      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 z-[1100] w-full max-w-full sm:max-w-[400px] md:max-w-[500px] bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${visible}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 id="cart-drawer-title" className="text-lg font-semibold">Shopping Cart</h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-400"
            tabIndex={isOpen ? 0 : -1}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        {/* Body (Cart lines) */}
        <div className="flex-1 overflow-y-auto px-3 py-2" tabIndex={-1}>
          {items.length === 0 ? (
            emptyState
          ) : (
            <div className="space-y-4 min-h-[200px]">{
              items.map(item => (
                <CartLineItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))
            }</div>
          )}
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white sticky bottom-0 z-10">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="w-full mt-4"
            onClick={onCheckout}
            disabled={items.length === 0}
            aria-label="Proceed to checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
}
