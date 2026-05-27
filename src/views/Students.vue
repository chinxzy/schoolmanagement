<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useStudentStore } from "@/stores/student";
import type { TableColumn } from "@/types";
import DataTable from "@/components/DataTable.vue";
import Input from "@/components/ui/Input.vue";
import Badge from "@/components/ui/Badge.vue";

const store = useStudentStore();
const search = ref("");

const columns: TableColumn[] = [
  { id: "", label: "First Name", field: "firstname" },
  { id: "", label: "Last Name", field: "lastname" },
  { id: "", label: "Gender", field: "gender" },
  { id: "", label: "Class", field: "classname" },
  { id: "", label: "Class Type", field: "classtype_name" },
  { id: "", label: "Class Teacher", field: "teacher_firstname" },
];

const filteredStudents = computed(() => {
  if (!search.value) return store.students;
  const q = search.value.toLowerCase();
  return store.students.filter(
    (s) =>
      s.firstname.toLowerCase().includes(q) ||
      s.lastname.toLowerCase().includes(q) ||
      s.classname?.toLowerCase().includes(q),
  );
});

onMounted(() => store.getStudents());
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h2 class="text-2xl font-bold">Students</h2>
        <p class="text-muted-foreground text-sm">
          {{ store.studentCount }} enrolled students
        </p>
      </div>
      <div class="flex gap-2">
        <Badge variant="secondary"
          >Science: {{ store.studentScienceCount }}</Badge
        >
        <Badge variant="secondary">Art: {{ store.studentArtCount }}</Badge>
        <Badge variant="secondary"
          >Commercial: {{ store.studentCommercialCount }}</Badge
        >
      </div>
    </div>

    <Input v-model="search" placeholder="Search students…" class="max-w-sm" />

    <DataTable
      :columns="columns"
      :data="filteredStudents as Record<string, unknown>[]"
      :loading="store.loading"
    />
  </div>
</template>
