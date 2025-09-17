export interface User {
  email: string;
  name: string;
  family_name?: string;
  picture?: string;
  sub: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string>;
}