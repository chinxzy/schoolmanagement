<template>
  <div class="container px-20 mt-10">
    <div
      class="flex justify-between border-2 border-logoColor rounded-t-xl bg-logoColor text-white"
    >
      <div class="p-5">
        <p>ClassType Summary</p>
      </div>
      <div class="p-5">date</div>
    </div>
    <div class="bg-logoColorLight p-2 flex justify-between">
      <div class="grid w-3/12">
        <div
          class="border-4 border-transparent mb-1 rounded-t-2xl shadow-2xl font-semibold p-4 bg-white text-center"
        >
          <p class="text-2xl m-3">Teachers</p>
          <div class="bg-pink-300 w-10 h-10 rounded-full px-2 mx-auto"></div>
        </div>
        <div
          class="border-4 border-transparent rounded-b-2xl shadow-2xl font-semibold p-4 bg-white text-center"
        >
          <p class="text-2xl m-3">Students</p>
          <div class="bg-blue-300 w-10 h-10 rounded-full px-2 mx-auto"></div>
        </div>
      </div>
      <div
        v-if="requestMode == 'loading'"
        class="grid w-8/12 bg-white text-center"
      >
        <p>loading</p>
      </div>

      <div v-if="requestMode == 'success'" class="grid w-8/12 bg-white">
        <client-only>
          <apexchart ref="myChart" :options="options" :series="series" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Student, useStudentStore } from "~~/store/student";
import { useClasstypeStore } from "../store/classtype";

export default defineComponent({
  data() {
    return {
      label: [] as string[],
      options: {
        chart: {
          id: "vuechart",
          type: "area",
        },
        xaxis: {
          categories: [] as string[],
        },
        tooltip: {
          theme: "dark",
          fillSeriesColor: false,
        },
      },
      series: [
        {
          name: "students",
          data: [30, 50, 60],
        },
      ],
    };
  },
  setup() {
    const classtype = useClasstypeStore();

    const studentStore = useStudentStore();

    const student = computed(() => {
      studentStore.$state.students.students;
    });

    const classtypeItem = computed(() => classtype.$state.classtype.classtype);

    const requestMode = computed(() => classtype.$state.requestMode.toString());

    return {
      classtypeItem,
      classtype,
      requestMode,
      student,
      studentStore,
    };
  },
  methods: {
    async getNewLabel() {
      await this.classtype.getClasstypes();
      this.classtypeItem.map((sub) => {
        this.label.push(sub.classtype_name);
      });
      this.options = {
        xaxis: {
          categories: this.label,
        },
      };
    },
  },
  mounted() {
    this.getNewLabel();
  },
});
</script>

