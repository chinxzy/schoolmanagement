<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  class?: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="emit('close')" />
        <!-- Panel -->
        <div
          :class="
            cn(
              'relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl',
              props.class,
            )
          "
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
