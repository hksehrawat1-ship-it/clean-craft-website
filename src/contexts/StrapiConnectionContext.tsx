
import React, { createContext, useContext, useEffect, useState } from 'react';
import { connectionService } from '@/lib/strapi/services/connection.service';

interface StrapiConnectionState {
  isConnected: boolean;
  isInitializing: boolean;
  error?: string;
  retryConnection: () => Promise<void>;
}

const StrapiConnectionContext = createContext<StrapiConnectionState | null>(null);

export function useStrapiConnection() {
  const context = useContext(StrapiConnectionContext);
  if (!context) {
    throw new Error('useStrapiConnection must be used within StrapiConnectionProvider');
  }
  return context;
}

interface StrapiConnectionProviderProps {
  children: React.ReactNode;
}

export function StrapiConnectionProvider({ children }: StrapiConnectionProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string>();

  const initializeConnection = async () => {
    try {
      setIsInitializing(true);
      setError(undefined);
      
      console.log('🚀 Initializing Strapi connection...');
      const connected = await connectionService.warmupConnection();
      
      setIsConnected(connected);
      
      if (!connected) {
        const status = connectionService.getStatus();
        setError(status.error || 'Failed to connect to Strapi');
      }
    } catch (err) {
      console.error('❌ Failed to initialize Strapi connection:', err);
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Connection initialization failed');
    } finally {
      setIsInitializing(false);
    }
  };

  const retryConnection = async () => {
    await initializeConnection();
  };

  useEffect(() => {
    initializeConnection();
  }, []);

  const value: StrapiConnectionState = {
    isConnected,
    isInitializing,
    error,
    retryConnection
  };

  return (
    <StrapiConnectionContext.Provider value={value}>
      {children}
    </StrapiConnectionContext.Provider>
  );
}
