import React, { useState, useCallback } from 'react';
import { CURRENCIES, INITIAL_AMOUNT, INITIAL_FROM, INITIAL_TO, Icons } from './constants';
import { CurrencySelector } from './components/CurrencySelector';
import { Button } from './components/Button';
import { ResultCard } from './components/ResultCard';
import { convertCurrency } from './services/geminiService';
import { ConversionResult, LoadingState } from './types';

function App() {
  const [amount, setAmount] = useState<number>(INITIAL_AMOUNT);
  const [fromCode, setFromCode] = useState<string>(INITIAL_FROM);
  const [toCode, setToCode] = useState<string>(INITIAL_TO);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
    setResult(null); 
    setStatus(LoadingState.IDLE);
  };

  const handleConvert = useCallback(async () => {
    if (amount <= 0) return;
    
    setStatus(LoadingState.LOADING);
    const fromCurrency = CURRENCIES.find(c => c.code === fromCode)!;
    const toCurrency = CURRENCIES.find(c => c.code === toCode)!;

    try {
      const data = await convertCurrency(
        amount,
        fromCurrency.code,
        fromCurrency.name,
        toCurrency.code,
        toCurrency.name
      );
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  }, [amount, fromCode, toCode]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"></div>

        <div className="relative w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 mb-4 shadow-xl">
                    <span className="text-gold-500 mr-2"><Icons.Gold /></span>
                    <span className="text-white font-bold tracking-tight text-lg">FinConvert</span>
                    <span className="text-gold-500 font-light ml-1">AI</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Döviz & Altın Çevirici</h1>
                <p className="text-slate-400 text-sm">Gemini AI teknolojisi ile anlık piyasa verileri</p>
            </div>

            {/* Main Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
                
                {/* Amount Input */}
                <div className="mb-6">
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Miktar</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full bg-slate-950 border-2 border-slate-800 hover:border-slate-700 focus:border-gold-500 rounded-xl py-4 px-4 text-2xl font-bold text-white placeholder-slate-600 focus:outline-none focus:ring-0 transition-colors"
                            placeholder="0.00"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">
                            {fromCode}
                        </span>
                    </div>
                </div>

                {/* Currency Selectors */}
                <div className="flex flex-col gap-4 relative">
                    <CurrencySelector 
                        label="Gönderilen Birim" 
                        selectedCode={fromCode} 
                        onSelect={setFromCode} 
                    />

                    {/* Swap Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] z-10">
                        <Button 
                            variant="icon" 
                            onClick={handleSwap}
                            className="bg-slate-800 border-4 border-slate-900 shadow-xl text-gold-500 hover:text-gold-400 hover:bg-slate-700"
                            aria-label="Birimi değiştir"
                        >
                            <Icons.Exchange />
                        </Button>
                    </div>

                    <CurrencySelector 
                        label="Alınan Birim" 
                        selectedCode={toCode} 
                        onSelect={setToCode} 
                    />
                </div>

                <div className="mt-8">
                    <Button 
                        variant="primary" 
                        className="w-full py-4 text-lg" 
                        onClick={handleConvert}
                        loading={status === LoadingState.LOADING}
                    >
                        Hesapla
                    </Button>
                </div>

                <ResultCard result={result} status={status} toCode={toCode} />

            </div>
            
            <p className="text-center text-slate-600 text-xs mt-6">
                Veriler Gemini AI tarafından internet üzerinden derlenmiştir. Yatırım tavsiyesi değildir.
            </p>
        </div>
    </div>
  );
}

export default App;
