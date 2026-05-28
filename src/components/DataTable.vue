<script setup lang="ts">
import type { TableColumn } from "@/types";

interface Props {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  loading?: boolean;
}
defineProps<Props>();
const emit = defineEmits<{ "row-click": [row: Record<string, unknown>] }>();
</script>

<template>
  <div class="w-full overflow-auto rounded-md border">
    <table class="w-full caption-bottom text-sm">
      <thead class="[&_tr]:border-b">
        <tr class="border-b bg-muted/50 transition-colors">
          <th
            v-for="col in columns"
            :key="col.id"
            class="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
          >
            {{ col.label }}
          </th>
          <th
            v-if="$slots.actions"
            class="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-16"
          ></th>
        </tr>
      </thead>
      <tbody class="[&_tr:last-child]:border-0">
        <tr v-if="loading">
          <td
            :colspan="$slots.actions ? columns.length + 1 : columns.length"
            class="p-8 text-center text-muted-foreground"
          >
            Loading…
          </td>
        </tr>
        <tr v-else-if="!data.length">
          <td
            :colspan="$slots.actions ? columns.length + 1 : columns.length"
            class="p-8 text-center text-muted-foreground"
          >
            No records found.
          </td>
        </tr>
        <tr
          v-for="(row, i) in data"
          :key="i"
          class="border-b transition-colors hover:bg-muted/50 cursor-pointer"
          @click="emit('row-click', row)"
        >
          <td v-for="col in columns" :key="col.id" class="p-4 align-middle">
            {{ row[col.field] }}
          </td>
          <td v-if="$slots.actions" class="p-4 align-middle">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
