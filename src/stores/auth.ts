import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

interface AuthState {
  token: string | null;
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: JwtService.getToken(),
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await ApiService.post("/admin/login", {
          email,
          password,
        });

        const token = data.token;
        this.token = token;
        this.user = { email };
        JwtService.saveToken(token);
        ApiService.setAuthorizationHeader();
      } catch (e: any) {
        this.error = e?.response?.data?.message ?? e?.message ?? "Login failed";
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      JwtService.destroyToken();
    },
  },
});
