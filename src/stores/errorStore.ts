import { defineStore } from "pinia";

interface ErrorModalState {
  isOpen: boolean;
  title: string;
  message: string;
}

export const useErrorModalStore = defineStore("errorModal", {
  state: (): ErrorModalState => ({
    isOpen: false,
    title: "",
    message: "",
  }),

  actions: {
    show(title: string, message: string) {
      this.title = title;
      this.message = message;
      this.isOpen = true;
    },
    hide() {
      this.isOpen = false;
      this.title = "";
      this.message = "";
    },
  },
});
