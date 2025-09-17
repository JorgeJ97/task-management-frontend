class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private isAuthenticated: boolean = false;
  private logoutCallback: (() => void) | null = null;
  private loginCallback: (() => void) | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Métodos para registrar callbacks desde componentes React
  setLogoutCallback(callback: () => void) {
    this.logoutCallback = callback;
  }

  setLoginCallback(callback: () => void) {
    this.loginCallback = callback;
  }

  setAuthState(token: string | null, isAuthenticated: boolean) {
    this.token = token;
    this.isAuthenticated = isAuthenticated;
  }

  getToken(): string | null {
    return this.token;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  async logout() {
    if (this.logoutCallback) {
      this.logoutCallback();
    }
    this.clearAuth();
  }

  async login() {
    if (this.loginCallback) {
      this.loginCallback();
    }
  }

  clearAuth() {
    this.token = null;
    this.isAuthenticated = false;
  }
}

export const authService = AuthService.getInstance();