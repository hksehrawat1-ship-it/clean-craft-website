import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
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
  
  // Use refs to prevent infinite loops
  const initializationAttempted = useRef(false);
  const isRetrying = useRef(false);

  const initializeConnection = async () => {
    // Prevent multiple simultaneous initialization attempts
    if (initializationAttempted.current || isRetrying.current) {
      console.log('🔄 Connection initialization already in progress, skipping...');
      return;
    }

    try {
      initializationAttempted.current = true;
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
    console.log('🔄 Retrying Strapi connection...');
    await initializeConnection();
  };

  useEffect(() => {
    // Only initialize once
    if (!initializationAttempted.current) {
      initializeConnection();
    }
  }, []);

  const value: StrapiConnectionState = {
    isConnected,
    isInitializing,
    error,
    retryConnection
  };

  // Safe fallback: render children no matter what, but you can also show loader/error if needed
  return (
    <StrapiConnectionContext.Provider value={value}>
      {children}
    </StrapiConnectionContext.Provider>
  );
}
