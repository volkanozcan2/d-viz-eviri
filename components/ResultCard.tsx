import React from 'react';
import { ConversionResult, LoadingState } from '../types';

interface ResultCardProps {
  result: ConversionResult | null;
  status: LoadingState;
  toCode: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, status, toCode }) => {
  if (status === LoadingState.IDLE && !result) {
    return (
        <div className="mt-8 p-8 border-2 border-dashed border-slate-800 rounded-2xl text-center text-slate-500">
            <p>Hesaplama yapmak için çevir butonuna basın.</p>
        </div>
    );
  }

  if (status === LoadingState.LOADING) {
    return (
      <div className="mt-8 p-8 bg-slate-800/30 rounded-2xl animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-1/3 mb-4 mx-auto"></div>
        <div className="h-10 bg-slate-700 rounded w-2/3 mx-auto mb-4"></div>
        <div className="h-3 bg-slate-700 rounded w-1/4 mx-auto"></div>
      </div>
    );
  }

  if (status === LoadingState.ERROR) {
    return (
        <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
            <p className="text-red-400 mb-1 font-semibold">Bir hata oluştu</p>
            <p className="text-red-500/70 text-sm">Lütfen tekrar deneyiniz.</p>
        </div>
    );
  }

  return (
    <div className="mt-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
        <p className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wide">Sonuç</p>
        <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-5xl font-bold text-white tracking-tight">
                {result?.convertedAmount.toLocaleString('tr-TR', { maximumFractionDigits: 4 })}
            </span>
            <span className="text-xl text-gold-500 font-semibold">{toCode}</span>
        </div>
        <div className="text-slate-500 text-xs flex flex-col items-center gap-1">
            <p>Kur: 1 {result?.from} = {result?.rate.toLocaleString('tr-TR')} {result?.to}</p>
            <p className="opacity-70">Son Güncelleme: {result?.lastUpdated}</p>
            
            {result?.sources && result.sources.length > 0 && (
              <div className="mt-2 text-[10px] text-slate-600 max-w-xs truncate">
                Kaynak: <a href={result.sources[0].uri} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 underline decoration-slate-600/50 hover:decoration-gold-500">{result.sources[0].title}</a>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};