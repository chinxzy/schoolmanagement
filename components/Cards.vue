<template>
  <div>
    <div class="px-20 font-semibold mt-7 container">
      <h4>Overview</h4>
    </div>
    <div class="grid grid-cols-3 gap-4 container mx-auto px-20 mt-10">
      <div
        class="border-4 border-transparent rounded-2xl border-l-indigo-900 shadow-2xl font-semibold p-4"
      >
        <p class="text-2xl m-3">No. of Teachers</p>
        <p class="text-3xl m-3">{{ teacher.teacherCount }}</p>
        <p class="text-xl m-3">
          No of class teachers: {{ classes.classCount }}
        </p>
      </div>
      <div
        class="border-4 border-transparent rounded-2xl border-l-indigo-900 shadow-2xl font-semibold p-4"
      >
        <p class="text-2xl m-3">No. of Students</p>
        <p class="text-3xl m-3">{{ student.studentCount }}</p>
        <span class="text-xl m-3">Art: {{ student.studentArtCount }}</span>
        <span class="text-xl m-3"
          >Commercial: {{ student.studentCommercialCount }}</span
        >
        <span class="text-xl m-3"
          >Science: {{ student.studentScienceCount }}</span
        >
      </div>
      <div
        class="border-4 border-transparent rounded-2xl border-l-indigo-900 shadow-2xl font-semibold p-4"
      >
        <p class="text-2xl m-3">No. of Classes</p>
        <p class="text-3xl m-3">50</p>
        <span class="text-xl m-3">Art: {{ classes.artCount }}</span>
        <span class="text-xl m-3">Commercial: {{ classes.commCount }}</span>
        <span class="text-xl m-3">Science: {{ classes.scienceCount }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStudentStore } from "../store/student";
import { useTeacherStore } from "../store/teachers";
import { useClassStore } from "../store/class";
import { useSubjectStore } from "~~/store/subject";

export default defineComponent({
  data() {
    return {
      students: 0,
    };
  },
  setup() {
    const subject = useSubjectStore();
    const subjectItem = computed(() => subject.$state.subjects.subjects);
    console.log("subjectssss", subjectItem);
    const student = useStudentStore();
    const teacher = useTeacherStore();
    const classes = useClassStore();
    const classItem = computed(() => classes.$state.classes.classes);
    const items = computed(() => student.$state.students.students);
    const artCount = computed(() => {
      return classItem.value.filter((classItem) => {
        return classItem.classtype_name == "Art";
      }).length;
    });
    console.log("items", items);
    return {
      student,
      items,
      teacher,
      classes,
      artCount,
    };
  },
  methods: {
    getNumber() {
      this.students = this.student.studentCount;
      console.log(this.student.studentCount);
    },
  },
  mounted() {
    this.student.getStudents();
    this.teacher.getTeachers();
    this.classes.getClasss();
  },
});
</script>
