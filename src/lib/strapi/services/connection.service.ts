
interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: number;
  retryCount: number;
  error?: string;
}

export class ConnectionService {
  private static instance: ConnectionService;
  private status: ConnectionStatus = {
    isConnected: false,
    lastChecked: 0,
    retryCount: 0
  };
  private readonly STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';
  private readonly CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  public static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  async checkConnection(): Promise<boolean> {
    const now = Date.now();
    
    // Return cached result if checked recently
    if (this.status.isConnected && (now - this.status.lastChecked) < this.CHECK_INTERVAL) {
      return true;
    }

    try {
      console.log('🔄 Checking Strapi connection...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${this.STRAPI_URL}/services?pagination[limit]=1`, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
        }
      });

      clearTimeout(timeoutId);

      this.status.isConnected = response.ok;
      this.status.lastChecked = now;
      this.status.retryCount = 0;
      this.status.error = undefined;

      console.log(this.status.isConnected ? '✅ Strapi connection successful' : '❌ Strapi connection failed');
      return this.status.isConnected;
    } catch (error) {
      this.status.isConnected = false;
      this.status.lastChecked = now;
      this.status.retryCount++;
      this.status.error = error instanceof Error ? error.message : 'Unknown error';
      
      console.error('❌ Strapi connection failed:', error);
      return false;
    }
  }

  async warmupConnection(): Promise<boolean> {
    console.log('🔥 Warming up Strapi connection...');
    return this.checkConnection();
  }

  getStatus(): ConnectionStatus {
    return { ...this.status };
  }

  isHealthy(): boolean {
    return this.status.isConnected && this.status.retryCount < 3;
  }
}

export const connectionService = ConnectionService.getInstance();
