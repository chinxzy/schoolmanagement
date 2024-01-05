<template>
  <div class="w-60 flex">
    <input
      type="text"
      class="border-2 border-black w-9/12 block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none rounded-l-md"
      placeholder="search"
      v-model="inputValue"
    />

    <button
      class="bg-logoColor p-3 rounded-r-md w-3/12"
      @click="$emit('search')"
    >
      <font-awesome-icon class="text-white" icon="fa-solid fa-search">
      </font-awesome-icon>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Search",
  emits: ["update-search-string", "filter"],

  data() {
    return {
      inputValue: "",
    };
  },

  watch: {
    inputValue(value: string) {
      this.$emit("update-search-string", value);
    },
  },
});
</script>
