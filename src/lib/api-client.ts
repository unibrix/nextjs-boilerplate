import { Api } from '@/api/generated/api';

const TOKEN_KEY = 'auth_token';

class APIClient extends Api {
  constructor() {
    super({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      securityWorker: () => {
        const token = this.getToken();
        return token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {};
      },
    });
  }

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }

    return null;
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const api = new APIClient();
