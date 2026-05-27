<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useSubjectStore } from "@/stores/subject";
import type { TableColumn } from "@/types";
import DataTable from "@/components/DataTable.vue";
import Dialog from "@/components/ui/Dialog.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";

const store = useSubjectStore();
const isOpen = ref(false);
const search = ref("");
const subjectName = ref("");
const subjectCode = ref("");

const pagination = ref({
  currentPage: 1,
  itemsPerPage: 10,
});
const columns: TableColumn[] = [
  { id: "1", label: "Subject Name", field: "subject_name" },
  { id: "2", label: "Subject Code", field: "code" },
];

// const filteredSubjects = computed(() => {
//   if (!search.value) return store.subjects.subjects;
//   const q = search.value.toLowerCase();
//   return store.subjects.subjects.filter(
//     (s) =>
//       s.subject_name.toLowerCase().includes(q) ||
//       s.code.toLowerCase().includes(q),
//   );
// });

async function submit() {
  if (!subjectName.value.trim()) return;
  await store.addSubject({
    subject_name: subjectName.value,
    code: subjectCode.value,
  });
  if (store.success) {
    isOpen.value = false;
    subjectName.value = "";
    subjectCode.value = "";
    await store.getSubjects();
  }
}
watch(
  () => pagination.value.currentPage,
  async (newPage) => {
    await store.getSubjects(pagination.value);
  },
);

onMounted(() => store.getSubjects(pagination.value));
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Subjects</h2>
        <p class="text-muted-foreground text-sm">
          {{ store.subjectCount }} subjects
        </p>
      </div>
      <Button @click="isOpen = true">+ Add Subject</Button>
    </div>

    <Input v-model="search" placeholder="Search subjects…" class="max-w-sm" />

    <DataTable
      :columns="columns"
      :data="(store.subjects.subjects ?? []) as Record<string, unknown>[]"
      :loading="store.loading"
    />
    <div class="flex justify-center">
      <a-pagination
        v-model:current="pagination.currentPage"
        :total="store.subjects.totalItems ?? 0"
      />
    </div>

    <Dialog :open="isOpen" @close="isOpen = false">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Add New Subject</h3>

        <div class="space-y-2">
          <Label for="sname">Subject Name</Label>
          <Input
            id="sname"
            v-model="subjectName"
            placeholder="e.g. Mathematics"
          />
        </div>

        <div class="space-y-2">
          <Label for="scode">Subject Code</Label>
          <Input id="scode" v-model="subjectCode" placeholder="e.g. MATH101" />
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
