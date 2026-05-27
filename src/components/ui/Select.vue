<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface Props {
  class?: string;
  modelValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const selected = computed({
  get: () => String(props.modelValue ?? ""),
  set: (val: string) => emit("update:modelValue", val),
});
</script>

<template>
  <select
    v-model="selected"
    :disabled="disabled"
    :class="
      cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </select>
</template>
