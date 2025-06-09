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
  private readonly INITIAL_TIMEOUT = 30000; // 30 seconds for initial connection
  private readonly NORMAL_TIMEOUT = 10000; // 10 seconds for subsequent checks
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 2000; // 2 seconds between retries

  private constructor() {}

  public static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  private async attemptConnection(timeout: number): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.STRAPI_URL}/services?pagination[limit]=1`, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
        }
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('⏱️ Connection attempt timed out');
      } else {
        console.error('❌ Connection attempt failed:', error);
      }
      return false;
    }
  }

  async checkConnection(isInitial: boolean = false): Promise<boolean> {
    const now = Date.now();
    
    // Return cached result if checked recently and not an initial check
    if (!isInitial && this.status.isConnected && (now - this.status.lastChecked) < this.CHECK_INTERVAL) {
      return true;
    }

    const timeout = isInitial ? this.INITIAL_TIMEOUT : this.NORMAL_TIMEOUT;
    let success = false;

    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      console.log(`🔄 Checking Strapi connection (Attempt ${attempt}/${this.MAX_RETRIES})...`);
      
      success = await this.attemptConnection(timeout);
      
      if (success) {
        break;
      } else if (attempt < this.MAX_RETRIES) {
        console.log(`⏳ Waiting ${this.RETRY_DELAY}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
      }
    }

    this.status.isConnected = success;
    this.status.lastChecked = now;
    this.status.retryCount = success ? 0 : this.status.retryCount + 1;
    this.status.error = success ? undefined : 'Connection failed after multiple attempts';

    console.log(success ? '✅ Strapi connection successful' : '❌ Strapi connection failed');
    return success;
  }

  async warmupConnection(): Promise<boolean> {
    console.log('🔥 Warming up Strapi connection...');
    return this.checkConnection(true);
  }

  getStatus(): ConnectionStatus {
    return { ...this.status };
  }

  isHealthy(): boolean {
    return this.status.isConnected && this.status.retryCount < this.MAX_RETRIES;
  }
}

export const connectionService = ConnectionService.getInstance();
