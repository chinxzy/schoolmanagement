import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { NewStudent, UpdateStudent, StudentData } from "@/types/student";

export const useStudentStore = defineStore("student", {
  state: () => ({
    students: {} as StudentData,
    loading: false,
    success: false,
    error: false,
  }),

  getters: {
    studentCount: (state): number => state.students?.totalItems ?? 0,
    studentScienceCount: (state): number =>
      state.students?.students?.filter((s) => s.classtype_name === "Science")
        .length ?? 0,
    studentArtCount: (state): number =>
      state.students?.students?.filter((s) => s.classtype_name === "Art")
        .length ?? 0,
    studentCommercialCount: (state): number =>
      state.students?.students?.filter((s) => s.classtype_name === "Commercial")
        .length ?? 0,
  },

  actions: {
    async getStudents(pagination?: {
      currentPage: number;
      itemsPerPage: number;
    }) {
      this.loading = true;
      this.error = false;
      try {
        const { data } = await ApiService.get(
          `/student?page=${pagination?.currentPage ?? 1}&itemsPerPage=${pagination?.itemsPerPage ?? 10}`,
        );
        this.students = data.students ?? data;
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error fetching students:", e);
      } finally {
        this.loading = false;
      }
    },

    async createStudent(details: NewStudent) {
      this.loading = true;
      this.error = false;
      this.success = false;
      try {
        await ApiService.post("/student/createStudent", details);
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error creating student:", e);
      } finally {
        this.loading = false;
      }
    },

    async updateStudent(id: string, details: UpdateStudent) {
      this.loading = true;
      this.error = false;
      this.success = false;
      try {
        await ApiService.put(`/student/update/${id}`, details);
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error updating student:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});
