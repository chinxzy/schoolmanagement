import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { Student } from "@/types";

export const useStudentStore = defineStore("student", {
  state: () => ({
    students: [] as Student[],
    loading: false,
    success: false,
    error: false,
  }),

  getters: {
    studentCount: (state): number => state.students.length,
    studentScienceCount: (state): number =>
      state.students.filter((s) => s.classtype_name === "Science").length,
    studentArtCount: (state): number =>
      state.students.filter((s) => s.classtype_name === "Art").length,
    studentCommercialCount: (state): number =>
      state.students.filter((s) => s.classtype_name === "Commercial").length,
  },

  actions: {
    async getStudents() {
      this.loading = true;
      this.error = false;
      try {
        const { data } = await ApiService.get("/user");
        this.students = data.students ?? data;
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error fetching students:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});
