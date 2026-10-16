/**
 * Nexus Arcade - Simulated Cyber Payment & Key Generator Modal
 * Author: Omar Khlifi
 * License: MIT
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useUser } from '../context/UserContext';
import { 
  X, 
  CreditCard, 
  Wallet, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Library,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    executeCheckout, 
    lastPurchasedOrder, 
    clearLastPurchasedOrder, 
    setActiveTab 
  } = useGame();

  const { profile } = useUser();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'nexusCredits'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9920');
  const [cardHolder, setCardHolder] = useState(profile.gamerTag);
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isCheckoutOpen && !lastPurchasedOrder) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      executeCheckout(paymentMethod);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    clearLastPurchasedOrder();
  };

  const handleGoToLibrary = () => {
    setIsCheckoutOpen(false);
    clearLastPurchasedOrder();
    setActiveTab('library');
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl rounded-3xl cyber-glass border border-cyan-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close checkout"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ORDER CONFIRMATION SCREEN (When lastPurchasedOrder exists) */}
            {lastPurchasedOrder ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center cyber-glow-emerald">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white font-['Orbitron']">
                    TRANSACTION CONFIRMED
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Your digital license keys have been minted and registered to your account.
                  </p>
                </div>

                {/* Generated License Keys */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-3">
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    ACTIVATION KEYS GENERATED:
                  </div>

                  {lastPurchasedOrder.items.map((item) => {
                    const key = lastPurchasedOrder.keys[item.game.id];
                    return (
                      <div
                        key={item.game.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
                      >
                        <div className="truncate pr-2">
                          <p className="font-bold text-white truncate">{item.game.title}</p>
                          <p className="text-cyan-400 text-[11px]">{key}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(key)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 flex items-center gap-1 text-[11px]"
                          title="Copy Key"
                        >
                          {copiedKey === key ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedKey === key ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Go to Library CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleGoToLibrary}
                    className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cyber-glow-cyan transition-all"
                  >
                    <Library className="w-4 h-4" />
                    Open My Library
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* CHECKOUT FORM */
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white font-['Orbitron'] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    Simulated Neural Checkout
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Safe test environment. No real funds or credit cards required.
                  </p>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 cyber-glow-cyan'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold">Credit Card</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'crypto'
                        ? 'bg-purple-950/60 border-purple-400 text-purple-300 cyber-glow-purple'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold">Web3 Wallet</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('nexusCredits')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'nexusCredits'
                        ? 'bg-amber-950/60 border-amber-400 text-amber-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Coins className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold">Nexus Credits</span>
                  </button>
                </div>

                {/* Method Specific Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    {/* Futuristic holographic credit card preview */}
                    <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/40 relative overflow-hidden shadow-xl">
                      <div className="flex justify-between items-center text-xs font-mono text-cyan-400 mb-6">
                        <span>NEXUS PLATINUM</span>
                        <span>0xCYBER</span>
                      </div>
                      <div className="text-base font-mono tracking-widest text-white mb-4">
                        {cardNumber}
                      </div>
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>CARDHOLDER: {cardHolder}</span>
                        <span>EXP: {cardExpiry}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 font-mono block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-mono block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3 text-center">
                    <div className="p-3 rounded-full bg-purple-900/40 w-12 h-12 mx-auto flex items-center justify-center text-purple-300">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono">
                      Connected Wallet: {profile.walletAddress}
                    </h4>
                    <p className="text-xs text-slate-300 font-mono">
                      Network: Ethereum Sepolia / Nexus L2 Rollup. Gas fees will be sponsored.
                    </p>
                  </div>
                )}

                {paymentMethod === 'nexusCredits' && (
                  <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2 text-center">
                    <div className="p-3 rounded-full bg-amber-900/40 w-12 h-12 mx-auto flex items-center justify-center text-amber-300">
                      <Coins className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono">
                      Available Balance: {profile.nexusCredits} Nexus Credits
                    </h4>
                    <p className="text-xs text-slate-300 font-mono">
                      Earned by leveling up, reviewing games, and completing achievements.
                    </p>
                  </div>
                )}

                {/* Total & Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-slate-400">Total to Authorize:</span>
                    <p className="text-2xl font-black font-mono text-white">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={handlePayNow}
                    disabled={isProcessing}
                    className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-black font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 cyber-glow-cyan transition-all"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Authorizing...
                      </span>
                    ) : (
                      <>
                        <span>Confirm & Mint Keys</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
