import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { SubjectData, NewSubject } from "@/types/subject";

export const useSubjectStore = defineStore("subject", {
  state: () => ({
    subjects: {} as SubjectData,
    loading: false,
    success: false,
    error: false,
  }),

  getters: {
    subjectCount: (state): number => state.subjects?.totalItems ?? 0,
  },

  actions: {
    async getSubjects(pagination?: {
      currentPage: number;
      itemsPerPage: number;
    }) {
      this.loading = true;
      this.error = false;
      try {
        const { data } = await ApiService.get(
          `/subject?page=${pagination?.currentPage ?? 1}&itemsPerPage=${pagination?.itemsPerPage ?? 10}`,
        );
        this.subjects = data;
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error fetching subjects:", e);
      } finally {
        this.loading = false;
      }
    },

    async addSubject(details: NewSubject) {
      this.loading = true;
      this.error = false;
      try {
        await ApiService.post("/subject/createSubject", details);
        this.success = true;
      } catch (e) {
        this.error = true;
        console.error("Error adding subject:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});
