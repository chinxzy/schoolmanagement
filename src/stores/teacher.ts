import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { Teacher, NewTeacher } from "@/types";

export const useTeacherStore = defineStore("teacher", {
  state: () => ({
    teachers: [] as Teacher[],
    loading: false,
    success: false,
    error: false,
  }),

  getters: {
    teacherCount: (state): number => state.teachers.length,
  },

  actions: {
    async getTeachers() {
      this.loading = true;
      this.error = false;
      try {
        const { data } = await ApiService.get("/teacher");
        this.teachers = data.teachers ?? data;
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error fetching teachers:", e);
      } finally {
        this.loading = false;
      }
    },

    async addTeacher(details: NewTeacher) {
      this.loading = true;
      this.error = false;
      try {
        await ApiService.post("/teacher/createTeacher", details);
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error adding teacher:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});
