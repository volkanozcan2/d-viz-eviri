import React, { useState, useRef, useEffect } from 'react';
import { Currency } from '../types';
import { CURRENCIES, Icons } from '../constants';

interface CurrencySelectorProps {
  label: string;
  selectedCode: string;
  onSelect: (code: string) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ label, selectedCode, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedCurrency = CURRENCIES.find(c => c.code === selectedCode) || CURRENCIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl p-3 flex items-center justify-between transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
            <span className={`p-2 rounded-lg bg-slate-900/50 text-gold-500 group-hover:text-gold-400 transition-colors`}>
                {selectedCurrency.icon}
            </span>
            <div className="text-left">
                <div className="font-bold text-slate-100">{selectedCurrency.code}</div>
                <div className="text-xs text-slate-400 font-medium">{selectedCurrency.name}</div>
            </div>
        </div>
        <div className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
             <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
           </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden max-h-80 overflow-y-auto">
          <div className="p-2 space-y-1">
            {CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onSelect(currency.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  selectedCode === currency.code 
                    ? 'bg-gold-500/10 text-gold-400' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-lg opacity-80">{currency.icon}</span>
                <div className="text-left flex-1">
                  <span className="block font-semibold text-sm">{currency.code}</span>
                  <span className="block text-xs opacity-60">{currency.name}</span>
                </div>
                {selectedCode === currency.code && (
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                     <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                   </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
