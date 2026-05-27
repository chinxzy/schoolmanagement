<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useClassStore } from "@/stores/class";
import { useTeacherStore } from "@/stores/teacher";
import { useClasstypeStore } from "@/stores/classtype";
import type { TableColumn } from "@/types";
import DataTable from "@/components/DataTable.vue";
import Dialog from "@/components/ui/Dialog.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Select from "@/components/ui/Select.vue";

const classStore = useClassStore();
const teacherStore = useTeacherStore();
const classtypeStore = useClasstypeStore();

const isOpen = ref(false);
const search = ref("");

const form = ref({
  classname: "",
  teacherId: "",
  classtypeId: "",
});

const columns: TableColumn[] = [
  { id: "1", label: "Class Name", field: "classname" },
  { id: "2", label: "Class Type", field: "classtype_name" },
  { id: "3", label: "Teacher First Name", field: "teacher_firstname" },
  { id: "4", label: "Teacher Last Name", field: "teacher_lastname" },
];

const filteredClasses = computed(() => {
  if (!search.value) return classStore.classes;
  const q = search.value.toLowerCase();
  return classStore.classes.filter(
    (c) =>
      c.classname.toLowerCase().includes(q) ||
      c.classtype_name?.toLowerCase().includes(q),
  );
});

async function submit() {
  if (!form.value.classname) return;
  await classStore.addClass(form.value);
  if (classStore.success) {
    isOpen.value = false;
    form.value = { classname: "", teacherId: "", classtypeId: "" };
    await classStore.getClasses();
  }
}

onMounted(async () => {
  await Promise.all([
    classStore.getClasses(),
    teacherStore.getTeachers(),
    classtypeStore.getClasstypes(),
  ]);
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Classes</h2>
        <p class="text-muted-foreground text-sm">
          {{ classStore.classCount }} classes
        </p>
      </div>
      <Button @click="isOpen = true">+ Add Class</Button>
    </div>

    <Input v-model="search" placeholder="Search classes…" class="max-w-sm" />

    <DataTable
      :columns="columns"
      :data="filteredClasses as Record<string, unknown>[]"
      :loading="classStore.loading"
    />

    <Dialog :open="isOpen" @close="isOpen = false">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Add New Class</h3>

        <div class="space-y-2">
          <Label for="cname">Class Name</Label>
          <Input id="cname" v-model="form.classname" placeholder="e.g. SS1A" />
        </div>

        <div class="space-y-2">
          <Label for="ctype">Class Type</Label>
          <Select
            id="ctype"
            :modelValue="String(form.classtypeId)"
            @update:modelValue="form.classtypeId = String($event)"
          >
            <option value="0" disabled>Select class type</option>
            <option
              v-for="ct in classtypeStore.classtypes"
              :key="ct.classtypeId"
              :value="String(ct.classtypeId)"
            >
              {{ ct.classtype_name }}
            </option>
          </Select>
        </div>

        <div class="space-y-2">
          <Label for="cteacher">Class Teacher</Label>
          <Select
            id="cteacher"
            :modelValue="String(form.teacherId)"
            @update:modelValue="form.teacherId = String($event)"
          >
            <option value="0" disabled>Select teacher</option>
            <option
              v-for="t in teacherStore.teachers"
              :key="t.teacherId"
              :value="String(t.teacherId)"
            >
              {{ t.teacher_firstname }} {{ t.teacher_lastname }}
            </option>
          </Select>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button variant="outline" @click="isOpen = false">Cancel</Button>
          <Button @click="submit" :disabled="classStore.loading">
            {{ classStore.loading ? "Saving…" : "Save" }}
          </Button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
