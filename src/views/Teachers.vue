<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useTeacherStore } from "@/stores/teacher";
import type { NewTeacher, TableColumn } from "@/types";
import DataTable from "@/components/DataTable.vue";
import Dialog from "@/components/ui/Dialog.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Select from "@/components/ui/Select.vue";

const store = useTeacherStore();
const isOpen = ref(false);
const search = ref("");

const form = ref<NewTeacher>({
  teacher_firstname: "",
  teacher_lastname: "",
  gender: "",
  email: "",
  phone: "",
});

const columns: TableColumn[] = [
  { id: "1", label: "First Name", field: "teacher_firstname" },
  { id: "2", label: "Last Name", field: "teacher_lastname" },
  { id: "3", label: "Gender", field: "gender" },
  { id: "4", label: "Email", field: "email" },
  { id: "5", label: "Phone", field: "phone" },
];

const filteredTeachers = computed(() => {
  if (!search.value) return store.teachers;
  const q = search.value.toLowerCase();
  return store.teachers.filter(
    (t) =>
      t.teacher_firstname.toLowerCase().includes(q) ||
      t.teacher_lastname.toLowerCase().includes(q),
  );
});

async function submit() {
  if (!form.value.teacher_firstname || !form.value.teacher_lastname) return;
  await store.addTeacher(form.value);
  if (store.success) {
    isOpen.value = false;
    form.value = {
      teacher_firstname: "",
      teacher_lastname: "",
      gender: "",
      email: "",
      phone: "",
    };
    await store.getTeachers();
  }
}

onMounted(() => store.getTeachers());
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Teachers</h2>
        <p class="text-muted-foreground text-sm">
          {{ store.teacherCount }} registered teachers
        </p>
      </div>
      <Button @click="isOpen = true">+ Add Teacher</Button>
    </div>

    <!-- Search -->
    <Input v-model="search" placeholder="Search teachers…" class="max-w-sm" />

    <!-- Table -->
    <DataTable
      :columns="columns"
      :data="filteredTeachers as Record<string, unknown>[]"
      :loading="store.loading"
    />

    <!-- Modal -->
    <Dialog :open="isOpen" @close="isOpen = false">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Add New Teacher</h3>

        <div class="space-y-2">
          <Label for="firstname">First Name</Label>
          <Input
            id="firstname"
            v-model="form.teacher_firstname"
            placeholder="John"
          />
        </div>

        <div class="space-y-2">
          <Label for="lastname">Last Name</Label>
          <Input
            id="lastname"
            v-model="form.teacher_lastname"
            placeholder="Doe"
          />
        </div>

        <div class="space-y-2">
          <Label for="gender">Gender</Label>
          <Select
            id="gender"
            :modelValue="form.gender"
            @update:modelValue="form.gender = $event"
          >
            <option value="0" disabled>Select gender</option>
            <option v-for="ct in ['Male', 'Female']" :key="ct" :value="ct">
              {{ ct }}
            </option>
          </Select>
        </div>

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="form.email"
            placeholder="john.doe@example.com"
          />
        </div>
        <div class="space-y-2">
          <Label for="phone">Phone number</Label>
          <Input id="phone" v-model="form.phone" placeholder="123-456-7890" />
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
