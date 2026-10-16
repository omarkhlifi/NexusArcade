/**
 * Nexus Arcade - Slide-Over Cart Drawer & Promo Code Applicator
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    clearCart, 
    setIsCheckoutOpen 
  } = useGame();

  const { sounds, unlockAchievement } = useUser();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const validPromos: Record<string, number> = {
    'NEXUS10': 10,
    'CYBER25': 25,
    'OMARVIP': 50,
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (!code) return;

    if (validPromos[code]) {
      setAppliedPromo({ code, percent: validPromos[code] });
      sounds.playSuccess();
      unlockAchievement('ach-discount-applied');
      setPromoCode('');
    } else {
      setPromoError('Invalid code. Try "NEXUS10", "CYBER25", or "OMARVIP".');
      sounds.playAction();
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.percent) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-screen max-w-md bg-slate-950 border-l border-cyan-500/30 cyber-glow-cyan shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Orbitron']">
                    Requisition Cart
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in queue
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="p-4 rounded-full bg-slate-900 border border-slate-800 w-16 h-16 mx-auto flex items-center justify-center text-slate-600">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white font-['Orbitron']">
                    Your Cart Is Empty
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Explore the catalog, inspect titles, and add next-generation games to your cart.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Browse Storefront
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-800">
                    <span>DIGITAL LICENSES</span>
                    <button
                      onClick={clearCart}
                      className="text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.game.id}
                      className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 group"
                    >
                      <img
                        src={item.game.coverImage}
                        alt={item.game.title}
                        className="w-14 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                          {item.game.title}
                        </h4>
                        <p className="text-[11px] text-cyan-400 font-mono">
                          {item.edition}
                        </p>
                        <p className="text-xs font-mono font-bold text-slate-200 mt-1">
                          {item.game.isFree ? 'FREE' : `$${item.price.toFixed(2)}`}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.game.id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Cart Footer: Discount Code & Checkout Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-slate-900/90 border-t border-slate-800 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. NEXUS10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white uppercase font-mono placeholder:normal-case placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold uppercase transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Code applied: {appliedPromo.code} (-{appliedPromo.percent}%)
                      </span>
                      <button
                        type="button"
                        onClick={() => setAppliedPromo(null)}
                        className="text-slate-500 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <p className="text-xs text-rose-400 font-mono flex items-center gap-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {promoError}
                    </p>
                  )}
                </form>

                {/* Subtotal & Discount Calculation */}
                <div className="space-y-2 text-xs font-mono pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedPromo.percent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                    <span>Grand Total:</span>
                    <span className="text-cyan-400 font-black">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cyber-glow-cyan transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

