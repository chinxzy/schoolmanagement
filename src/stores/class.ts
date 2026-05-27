import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { Classes, NewClass } from "@/types";

export const useClassStore = defineStore("class", {
  state: () => ({
    classes: [] as Classes[],
    loading: false,
    success: false,
    error: false,
  }),

  getters: {
    classCount: (state): number => state.classes.length,
    artCount: (state): number =>
      state.classes.filter((c) => c.classtype_name === "Art").length,
    commCount: (state): number =>
      state.classes.filter((c) => c.classtype_name === "Commercial").length,
    scienceCount: (state): number =>
      state.classes.filter((c) => c.classtype_name === "Science").length,
  },

  actions: {
    async getClasses() {
      this.loading = true;
      this.error = false;
      try {
        const { data } = await ApiService.get("/class");
        this.classes = data.classes ?? data;
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error fetching classes:", e);
      } finally {
        this.loading = false;
      }
    },

    async addClass(details: NewClass) {
      this.loading = true;
      this.error = false;
      try {
        await ApiService.post("/class/createClass", details);
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error adding class:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});
