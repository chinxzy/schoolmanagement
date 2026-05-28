<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useStudentStore } from "@/stores/student";
import { useClassStore } from "@/stores/class";
import type { TableColumn } from "@/types";
import type { Student } from "@/types/student";
import DataTable from "@/components/DataTable.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Badge from "@/components/ui/Badge.vue";
import Select from "@/components/ui/Select.vue";

const store = useStudentStore();
const classStore = useClassStore();
const search = ref("");
const pagination = ref({
  currentPage: 1,
  itemsPerPage: 10,
});
// Create
const isOpen = ref(false);
const form = ref({
  firstname: "",
  lastname: "",
  gender: "",
  classnameId: "",
  dateOfBirth: "",
  addmissionNo: "",
});

// Edit
const editOpen = ref(false);
const editingStudent = ref<Student | null>(null);
const editForm = ref({
  firstname: "",
  lastname: "",
  gender: "",
  classnameId: "",
  dateOfBirth: "",
  addmissionNo: "",
  status: "",
});

const columns: TableColumn[] = [
  { id: "1", label: "First Name", field: "firstname" },
  { id: "2", label: "Last Name", field: "lastname" },
  { id: "3", label: "Gender", field: "gender" },
  { id: "4", label: "Class", field: "classname" },
  { id: "5", label: "Class Type", field: "classtype_name" },
  { id: "6", label: "Status", field: "status" },
  { id: "7", label: "Admission No.", field: "addmissionNo" },
  { id: "8", label: "Date of Birth", field: "dateOfBirth" },
];

const filteredStudents = computed(() => {
  if (!search.value) return store.students;
  const q = search.value.toLowerCase();
  return store.students.students.filter(
    (s) =>
      s.firstname.toLowerCase().includes(q) ||
      s.lastname.toLowerCase().includes(q) ||
      s.classname?.toLowerCase().includes(q),
  );
});

watch(
  () => pagination.value.currentPage,
  async () => {
    await store.getStudents(pagination.value);
  },
);

function openEdit(student: Student) {
  editingStudent.value = student;
  editForm.value = {
    firstname: student.firstname,
    lastname: student.lastname,
    gender: student.gender,
    classnameId: student.classnameId ?? "",
    dateOfBirth: student.dateOfBirth ?? "",
    addmissionNo: student.addmissionNo ?? "",
    status: student.status ?? "",
  };
  editOpen.value = true;
}

async function submitCreate() {
  if (!form.value.firstname.trim() || !form.value.classnameId) return;
  await store.createStudent(form.value);
  if (store.success) {
    isOpen.value = false;
    form.value = {
      firstname: "",
      lastname: "",
      gender: "",
      classnameId: "",
      dateOfBirth: "",
      addmissionNo: "",
    };
    await store.getStudents();
  }
}

async function submitEdit() {
  if (!editingStudent.value) return;
  await store.updateStudent(editingStudent.value.studentId, editForm.value);
  if (store.success) {
    editOpen.value = false;
    await store.getStudents();
  }
}

onMounted(async () => {
  await Promise.all([store.getStudents(), classStore.getClasses()]);
});
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
      <div class="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary"
          >Science: {{ store.studentScienceCount }}</Badge
        >
        <Badge variant="secondary">Art: {{ store.studentArtCount }}</Badge>
        <Badge variant="secondary"
          >Commercial: {{ store.studentCommercialCount }}</Badge
        >
        <Button @click="isOpen = true">+ Add Student</Button>
      </div>
    </div>

    <Input v-model="search" placeholder="Search students…" class="max-w-sm" />

    <DataTable
      :columns="columns"
      :data="filteredStudents as Record<string, unknown>[]"
      :loading="store.loading"
    >
      <template #actions="{ row }">
        <button
          class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Edit"
          @click.stop="openEdit(row as unknown as Student)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </template>
    </DataTable>
    <div class="flex justify-center">
      <a-pagination
        v-model:current="pagination.currentPage"
        :total="store.students.totalItems ?? 0"
      />
    </div>
    <!-- Create Student Drawer -->
    <a-drawer
      v-model:open="isOpen"
      title="Add New Student"
      placement="right"
      :width="420"
      @close="isOpen = false"
    >
      <div class="space-y-4">
        <div class="grid gap-3">
          <div class="space-y-2">
            <Label for="sfirst">First Name</Label>
            <Input
              id="sfirst"
              v-model="form.firstname"
              placeholder="First name"
            />
          </div>
          <div class="space-y-2">
            <Label for="slast">Last Name</Label>
            <Input id="slast" v-model="form.lastname" placeholder="Last name" />
          </div>
        </div>

        <div class="grid gap-3">
          <div class="space-y-2">
            <Label for="sgender">Gender</Label>
            <Select id="sgender" v-model="form.gender">
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </div>
          <div class="space-y-2">
            <Label for="sclass">Class</Label>
            <Select id="sclass" v-model="form.classnameId">
              <option value="" disabled>Select class</option>
              <option
                v-for="c in classStore.classes"
                :key="c.classnameId"
                :value="c.classnameId"
              >
                {{ c.classname }}
              </option>
            </Select>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="space-y-2">
            <Label for="sdob">Date of Birth</Label>
            <Input id="sdob" v-model="form.dateOfBirth" type="date" />
          </div>
          <div class="space-y-2">
            <Label for="sadm">Admission No.</Label>
            <Input
              id="sadm"
              v-model="form.addmissionNo"
              placeholder="e.g. ADM/2024/001"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button variant="outline" @click="isOpen = false">Cancel</Button>
          <Button @click="submitCreate" :disabled="store.loading">
            {{ store.loading ? "Saving…" : "Save" }}
          </Button>
        </div>
      </div>
    </a-drawer>

    <!-- Edit Student Drawer -->
    <a-drawer
      v-model:open="editOpen"
      title="Edit Student"
      placement="right"
      :width="420"
      @close="editOpen = false"
    >
      <div class="space-y-4">
        <div class="grid gap-3">
          <div class="space-y-2">
            <Label for="efirst">First Name</Label>
            <Input
              id="efirst"
              v-model="editForm.firstname"
              placeholder="First name"
            />
          </div>
          <div class="space-y-2">
            <Label for="elast">Last Name</Label>
            <Input
              id="elast"
              v-model="editForm.lastname"
              placeholder="Last name"
            />
          </div>
        </div>

        <div class="grid gap-3">
          <div class="space-y-2">
            <Label for="egender">Gender</Label>
            <Select id="egender" v-model="editForm.gender">
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </div>
          <div class="space-y-2">
            <Label for="eclass">Class</Label>
            <Select id="eclass" v-model="editForm.classnameId">
              <option value="" disabled>Select class</option>
              <option
                v-for="c in classStore.classes"
                :key="c.classnameId"
                :value="c.classnameId"
              >
                {{ c.classname }}
              </option>
            </Select>
          </div>
        </div>

        <div class="grid gap-3">
          <div class="space-y-2">
            <Label for="edob">Date of Birth</Label>
            <Input id="edob" v-model="editForm.dateOfBirth" type="date" />
          </div>
          <div class="space-y-2">
            <Label for="eadm">Admission No.</Label>
            <Input
              id="eadm"
              v-model="editForm.addmissionNo"
              placeholder="Admission No."
            />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="estatus">Status</Label>
          <Select id="estatus" v-model="editForm.status">
            <option value="" disabled>Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
            <option value="Suspended">Suspended</option>
          </Select>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button variant="outline" @click="editOpen = false">Cancel</Button>
          <Button @click="submitEdit" :disabled="store.loading">
            {{ store.loading ? "Saving…" : "Update" }}
          </Button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
