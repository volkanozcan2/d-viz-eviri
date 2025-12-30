import React from 'react';
import { Currency } from './types';

// Simple Icon Components to avoid external dependencies for Icons
export const Icons = {
  Exchange: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  Gold: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  Money: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  TrendUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  )
};

export const CURRENCIES: Currency[] = [
  { code: 'TRY', name: 'Türk Lirası', symbol: '₺', type: 'fiat', icon: <Icons.Money /> },
  { code: 'USD', name: 'Amerikan Doları', symbol: '$', type: 'fiat', icon: <Icons.Money /> },
  { code: 'EUR', name: 'Euro', symbol: '€', type: 'fiat', icon: <Icons.Money /> },
  { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£', type: 'fiat', icon: <Icons.Money /> },
  { code: 'JPY', name: 'Japon Yeni', symbol: '¥', type: 'fiat', icon: <Icons.Money /> },
  { code: 'CHF', name: 'İsviçre Frangı', symbol: 'Fr', type: 'fiat', icon: <Icons.Money /> },
  { code: 'GRAM_ALTIN', name: 'Gram Altın', symbol: 'g', type: 'commodity', icon: <Icons.Gold /> },
  { code: 'XAU', name: 'Ons Altın', symbol: 'oz', type: 'commodity', icon: <Icons.Gold /> },
  { code: 'XAG', name: 'Gümüş', symbol: 'oz', type: 'commodity', icon: <Icons.Gold /> },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', type: 'crypto', icon: <Icons.TrendUp /> },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', type: 'crypto', icon: <Icons.TrendUp /> },
];

export const INITIAL_AMOUNT = 1;
export const INITIAL_FROM = 'USD';
export const INITIAL_TO = 'TRY';
