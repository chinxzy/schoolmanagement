<template>
  <select
    @input="handleInputEvent"
    :value="selected"
    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 flex-1"
  >
    <option
      value=""
      selected
      :disabled="disableDefaultOption"
      v-if="defaultText.length"
    >
      {{ defaultText }}
    </option>
    <slot name="first-option"></slot>
    <option
      v-for="(option, index) in options"
      :key="option[keyProperty] || index"
      :value="option[valueProperty] || option"
    >
      {{ option[textProperty] || option }}
    </option>
  </select>
  <transition name="fade" mode="out-in">
    <p class="" v-text="error"></p>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseSelect",
  emits: ["update:value"],
  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    defaultText: {
      type: String,
      default: "",
    },
    disableDefaultOption: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array as () => any[],
      required: true,
    },
    keyProperty: {
      type: String,
      default: "",
    },
    textProperty: {
      type: String,
      default: "",
    },
    valueProperty: {
      type: String,
      default: "",
    },
  },

  computed: {
    selected: {
      get(): string | number {
        return this.value;
      },
      set(newValue: string | number) {
        this.$emit("update:value", newValue);
      },
    },
  },

  methods: {
    handleInputEvent(event: Event) {
      const value = (event.currentTarget as HTMLSelectElement).value;
      this.$emit("update:value", value);
    },
  },
});
</script>