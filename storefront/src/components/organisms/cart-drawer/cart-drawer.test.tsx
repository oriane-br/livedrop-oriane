import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartDrawer } from './cart-drawer';
import { CartItem } from '@/lib/api';

vi.mock('@/components/molecules/cart-line-item', () => ({
  CartLineItem: ({ item, onUpdateQuantity, onRemove }: any) => (
    <div data-testid={`cart-item-${item.product.id}`}>{item.product.title}
      <button data-testid={`qty-inc-${item.product.id}`} onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}>+</button>
      <button data-testid={`rmv-${item.product.id}`} onClick={() => onRemove(item.product.id)}>X</button>
    </div>
  )
}));

describe('CartDrawer', () => {
  const cartItems: CartItem[] = [
    { product: { id: 'a', title: 'One', price: 10, image: '', tags: [], stockQty: 5 }, quantity: 2 },
    { product: { id: 'b', title: 'Two', price: 25, image: '', tags: [], stockQty: 2 }, quantity: 1 },
  ];
  const renderDrawer = (props: any = {}) => render(
    <CartDrawer
      isOpen={props.isOpen ?? true}
      onClose={props.onClose ?? vi.fn()}
      items={props.items ?? cartItems}
      onUpdateQuantity={props.onUpdateQuantity ?? vi.fn()}
      onRemove={props.onRemove ?? vi.fn()}
      onCheckout={props.onCheckout ?? vi.fn()}
    />
  );

  it('renders when open', () => {
    renderDrawer();
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  it('hidden when closed', () => {
    renderDrawer({ isOpen: false });
    // Drawer has translate-x-full, should not be visible or clickable
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('translate-x-full');
  });

  it('shows all cart items', () => {
    renderDrawer();
    expect(screen.getByTestId('cart-item-a')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-b')).toBeInTheDocument();
  });

  it('displays correct subtotal and total', () => {
    renderDrawer();
    // subtotal: (2*10) + (1*25) = 45
    expect(screen.getAllByText('$45.00').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Total/)[0].nextSibling?.textContent).toContain('$45.00');
  });

  it('checkout button calls onCheckout', () => {
    const onCheckout = vi.fn();
    renderDrawer({ onCheckout });
    fireEvent.click(screen.getByRole('button', { name: /checkout/i }));
    expect(onCheckout).toHaveBeenCalled();
  });

  it('close button calls onClose', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    fireEvent.click(screen.getByLabelText(/close cart/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('ESC calls onClose', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('backdrop click calls onClose', () => {
    const onClose = vi.fn();
    renderDrawer({ onClose });
    fireEvent.click(screen.getByRole('dialog').previousSibling! as Element, { bubbles: true });
    expect(onClose).toHaveBeenCalled();
  });

  it('Continue shopping button (empty) closes drawer', () => {
    const onClose = vi.fn();
    renderDrawer({ items: [], onClose });
    fireEvent.click(screen.getByRole('button', { name: /continue shopping/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows empty state when no items', () => {
    renderDrawer({ items: [] });
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('focus trapped inside drawer', () => {
    renderDrawer();
    const closeBtn = screen.getByLabelText(/close cart/i);
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);
    
    // Focus should stay within the drawer
    const drawer = screen.getByRole('dialog');
    expect(drawer.contains(document.activeElement)).toBe(true);
  });

  it('each CartItem forwards update/remove', () => {
    const onUpdateQuantity = vi.fn();
    const onRemove = vi.fn();
    renderDrawer({ onUpdateQuantity, onRemove });
    fireEvent.click(screen.getByTestId('qty-inc-a'));
    fireEvent.click(screen.getByTestId('rmv-b'));
    expect(onUpdateQuantity).toHaveBeenCalledWith('a', 3);
    expect(onRemove).toHaveBeenCalledWith('b');
  });

  it('drawer uses dialog role and a11y labels', () => {
    renderDrawer();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(screen.getByText('Shopping Cart').id).toBe(dialog.getAttribute('aria-labelledby'));
  });

  it('renders many CartItems with scrolling', () => {
    const many = [];
    for (let i = 0; i < 22; i++) {
      many.push({ product: { id: `p${i}`, title: `P${i}`, price: 1 + i, image: '', tags: [], stockQty: 99 }, quantity: 2 });
    }
    renderDrawer({ items: many });
    expect(screen.getByTestId('cart-item-p10')).toBeInTheDocument();
    // body uses overflow-y-auto
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('.overflow-y-auto')).toBeTruthy();
  });
});
