<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useSubjectStore } from "@/stores/subject";
import { useClasstypeStore } from "@/stores/classtype";
import type { TableColumn } from "@/types";
import type { Subject } from "@/types/subject";
import DataTable from "@/components/DataTable.vue";
import Dialog from "@/components/ui/Dialog.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";

const store = useSubjectStore();
const classtypeStore = useClasstypeStore();
const isOpen = ref(false);
const search = ref("");
const subjectName = ref("");
const subjectCode = ref("");
const selectedClasstypeIds = ref<string[]>([]);
// const currentPage = ref(1);

// Edit drawer
const editOpen = ref(false);
const editingSubject = ref<Subject | null>(null);
const editName = ref("");
const editCode = ref("");
const editClasstypeIds = ref<string[]>([]);

const pagination = ref({
  currentPage: 1,
  itemsPerPage: 10,
});

const columns: TableColumn[] = [
  { id: "1", label: "Subject Name", field: "subject_name" },
  { id: "2", label: "Subject Code", field: "code" },
  { id: "3", label: "Class Types", field: "classtype_names" },
];

const tableData = computed(() =>
  (store.subjects.subjects ?? []).map((s) => ({
    ...s,
    classtype_names:
      s.classtypes?.map((c) => c.classtype_name).join(", ") || "—",
  })),
);

function openEdit(row: Record<string, unknown>) {
  const subject = (store.subjects.subjects ?? []).find(
    (s) => s.subjectId === row.subjectId,
  );
  if (!subject) return;
  editingSubject.value = subject;
  editName.value = subject.subject_name;
  editCode.value = subject.code;
  editClasstypeIds.value = subject.classtypes?.map((c) => c.classtypeId) ?? [];
  editOpen.value = true;
}

async function submit() {
  if (!subjectName.value.trim()) return;
  await store.addSubject({
    subject_name: subjectName.value,
    code: subjectCode.value,
    classtypeId: selectedClasstypeIds.value,
  });
  if (store.success) {
    isOpen.value = false;
    subjectName.value = "";
    subjectCode.value = "";
    selectedClasstypeIds.value = [];
    await store.getSubjects(pagination.value);
  }
}

async function submitEdit() {
  if (!editingSubject.value || !editName.value.trim()) return;
  await store.updateSubject(editingSubject.value.subjectId!, {
    subject_name: editName.value,
    code: editCode.value,
    classtypeId: editClasstypeIds.value,
  });
  if (store.success) {
    editOpen.value = false;
    await store.getSubjects(pagination.value);
  }
}

watch(
  () => pagination.value.currentPage,
  async () => {
    await store.getSubjects(pagination.value);
  },
);

onMounted(async () => {
  await Promise.all([
    store.getSubjects(pagination.value),
    classtypeStore.getClasstypes(),
  ]);
});
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
      :data="tableData as Record<string, unknown>[]"
      :loading="store.loading"
      @row-click="openEdit"
    />

    <div class="flex justify-center">
      <a-pagination
        v-model:current="pagination.currentPage"
        :total="store.subjects.totalItems ?? 0"
      />
    </div>

    <!-- Add Subject Dialog -->
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

        <div class="space-y-2">
          <Label>Class Types</Label>
          <a-select
            v-model:value="selectedClasstypeIds"
            mode="multiple"
            placeholder="Select class types"
            style="width: 100%"
            :options="
              classtypeStore.classtypes.map((ct) => ({
                value: ct.classtypeId,
                label: ct.classtype_name,
              }))
            "
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

    <!-- Edit Subject Drawer -->
    <a-drawer
      v-model:open="editOpen"
      title="Edit Subject"
      placement="right"
      :width="400"
      @close="editOpen = false"
    >
      <div class="space-y-4">
        <div class="space-y-2">
          <Label for="ename">Subject Name</Label>
          <Input id="ename" v-model="editName" placeholder="Subject name" />
        </div>

        <div class="space-y-2">
          <Label for="ecode">Subject Code</Label>
          <Input id="ecode" v-model="editCode" placeholder="Subject code" />
        </div>

        <div class="space-y-2">
          <Label>Class Types</Label>
          <a-select
            v-model:value="editClasstypeIds"
            mode="multiple"
            placeholder="Select class types"
            style="width: 100%"
            :options="
              classtypeStore.classtypes.map((ct) => ({
                value: ct.classtypeId,
                label: ct.classtype_name,
              }))
            "
          />
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
