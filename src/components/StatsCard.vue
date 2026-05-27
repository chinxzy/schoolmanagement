<script setup lang="ts">
interface Props {
  title: string;
  value: number | string;
  description?: string;
  icon?: string;
  color?: string;
}
defineProps<Props>();
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
        <p class="mt-2 text-3xl font-bold">{{ value }}</p>
        <p v-if="description" class="mt-1 text-sm text-muted-foreground">
          {{ description }}
        </p>
      </div>
      <div
        v-if="icon"
        :class="[
          'flex h-12 w-12 items-center justify-center rounded-full text-2xl',
          color ?? 'bg-primary/10',
        ]"
      >
        {{ icon }}
      </div>
    </div>
  </div>
</template>
