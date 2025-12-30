export interface Currency {
  code: string;
  name: string;
  symbol?: string;
  type: 'fiat' | 'crypto' | 'commodity';
  icon?: React.ReactNode;
}

export interface ConversionResult {
  from: string;
  to: string;
  originalAmount: number;
  convertedAmount: number;
  rate: number;
  lastUpdated: string;
  sources?: {
    uri: string;
    title: string;
  }[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
