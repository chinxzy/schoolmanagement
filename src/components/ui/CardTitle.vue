<script setup lang="ts">
import { cn } from "@/lib/utils";
interface Props {
  class?: string;
}
const props = defineProps<Props>();
</script>
<template>
  <p
    :class="cn('text-sm font-medium leading-none tracking-tight', props.class)"
  >
    <slot />
  </p>
</template>
