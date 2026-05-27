import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { Classtype } from "@/types";

export const useClasstypeStore = defineStore("classtype", {
  state: () => ({
    classtypes: [] as Classtype[],
    loading: false,
    success: false,
    error: false,
  }),

  getters: {
    classtypeCount: (state): number => state.classtypes.length,
  },

  actions: {
    async getClasstypes() {
      this.loading = true;
      this.error = false;
      try {
        const { data } = await ApiService.get("/classtype");
        this.classtypes = data.classtype ?? data;
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error fetching classtypes:", e);
      } finally {
        this.loading = false;
      }
    },

    async addClasstype(details: { classtype_name: string }) {
      this.loading = true;
      this.error = false;
      try {
        await ApiService.post("/classtype/createClasstype", details);
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error adding classtype:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});
