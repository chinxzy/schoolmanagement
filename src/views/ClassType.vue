<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useClasstypeStore } from "@/stores/classtype";
import type { TableColumn } from "@/types";
import DataTable from "@/components/DataTable.vue";
import Dialog from "@/components/ui/Dialog.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";

const store = useClasstypeStore();
const isOpen = ref(false);
const search = ref("");
const classtypeName = ref("");

const columns: TableColumn[] = [
  { id: "1", label: "Class Type Name", field: "classtype_name" },
];

const filteredClasstypes = computed(() => {
  if (!search.value) return store.classtypes;
  const q = search.value.toLowerCase();
  return store.classtypes.filter((ct) =>
    ct.classtype_name.toLowerCase().includes(q),
  );
});

async function submit() {
  if (!classtypeName.value.trim()) return;
  await store.addClasstype({ classtype_name: classtypeName.value });
  if (store.success) {
    isOpen.value = false;
    classtypeName.value = "";
    await store.getClasstypes();
  }
}

onMounted(() => store.getClasstypes());
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Class Types</h2>
        <p class="text-muted-foreground text-sm">
          {{ store.classtypeCount }} registered class types
        </p>
      </div>
      <Button @click="isOpen = true">+ Add Class Type</Button>
    </div>

    <!-- Search -->
    <Input
      v-model="search"
      placeholder="Search class types…"
      class="max-w-sm"
    />

    <!-- Table -->
    <DataTable
      :columns="columns"
      :data="filteredClasstypes as Record<string, unknown>[]"
      :loading="store.loading"
    />

    <!-- Modal -->
    <Dialog :open="isOpen" @close="isOpen = false">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Add New Class Type</h3>

        <div class="space-y-2">
          <Label for="ctname">Class Type Name</Label>
          <Input
            id="ctname"
            v-model="classtypeName"
            placeholder="e.g. Science"
          />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button variant="outline" @click="isOpen = false">Cancel</Button>
          <Button @click="submit" :disabled="store.loading">
            {{ store.loading ? "Saving…" : "Save" }}
          </Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
