export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>((set) => ({
  // ... existing implementation
})); 