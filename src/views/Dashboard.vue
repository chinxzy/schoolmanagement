<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useTeacherStore } from "@/stores/teacher";
import { useStudentStore } from "@/stores/student";
import { useClassStore } from "@/stores/class";
import { useSubjectStore } from "@/stores/subject";
import StatsCard from "@/components/StatsCard.vue";

const teacherStore = useTeacherStore();
const studentStore = useStudentStore();
const classStore = useClassStore();
const subjectStore = useSubjectStore();

onMounted(async () => {
  await Promise.all([
    subjectStore.getSubjects(),
    teacherStore.getTeachers(),
    studentStore.getStudents(),
    classStore.getClasses(),
  ]);
});

const stats = computed(() => [
  {
    title: "Total Teachers",
    value: teacherStore.teacherCount,
    icon: "👩‍🏫",
    color: "bg-blue-100",
    description: "Registered teaching staff",
  },
  {
    title: "Total Students",
    value: studentStore.studentCount,
    icon: "🎓",
    color: "bg-green-100",
    description: `Art: ${studentStore.studentArtCount} · Science: ${studentStore.studentScienceCount} · Commercial: ${studentStore.studentCommercialCount}`,
  },
  {
    title: "Total Classes",
    value: classStore.classCount,
    icon: "🏫",
    color: "bg-purple-100",
    description: `Art: ${classStore.artCount} · Science: ${classStore.scienceCount} · Comm: ${classStore.commCount}`,
  },
  {
    title: "Total Subjects",
    value: subjectStore.subjectCount,
    icon: "📚",
    color: "bg-orange-100",
    description: "Active subjects",
  },
]);
</script>

<template>
  <div class="p-6 space-y-6">
    <div>
      <h2 class="text-2xl font-bold">Overview</h2>
      <p class="text-muted-foreground text-sm">Welcome back, Admin</p>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :color="stat.color"
        :description="stat.description"
      />
    </div>

    <!-- Class breakdown -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-semibold mb-4">Student Breakdown by Class Type</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Science</span>
            <div class="flex items-center gap-2">
              <div
                class="h-2 rounded-full bg-blue-500"
                :style="`width: ${studentStore.studentCount ? (studentStore.studentScienceCount / studentStore.studentCount) * 160 : 0}px`"
              />
              <span class="text-sm font-medium w-8 text-right">{{
                studentStore.studentScienceCount
              }}</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Art</span>
            <div class="flex items-center gap-2">
              <div
                class="h-2 rounded-full bg-green-500"
                :style="`width: ${studentStore.studentCount ? (studentStore.studentArtCount / studentStore.studentCount) * 160 : 0}px`"
              />
              <span class="text-sm font-medium w-8 text-right">{{
                studentStore.studentArtCount
              }}</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Commercial</span>
            <div class="flex items-center gap-2">
              <div
                class="h-2 rounded-full bg-orange-500"
                :style="`width: ${studentStore.studentCount ? (studentStore.studentCommercialCount / studentStore.studentCount) * 160 : 0}px`"
              />
              <span class="text-sm font-medium w-8 text-right">{{
                studentStore.studentCommercialCount
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border bg-card p-6">
        <h3 class="font-semibold mb-4">Class Breakdown by Type</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Science Classes</span>
            <span class="text-sm font-bold">{{ classStore.scienceCount }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Art Classes</span>
            <span class="text-sm font-bold">{{ classStore.artCount }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Commercial Classes</span>
            <span class="text-sm font-bold">{{ classStore.commCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
