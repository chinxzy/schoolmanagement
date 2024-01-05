<template>
  <NavBar />
  <div class="container px-20 py-10">
    <div class="flex justify-between">
      <Search
        @update-search-string="updateSearchString"
        @filter="handleFilter"
      />
      <button
        class="bg-logoColor p-3 rounded-md text-white"
        @click="toggleModal()"
      >
        <span
          ><font-awesome-icon class="text-white mr-4" icon="fa-solid fa-add">
          </font-awesome-icon
        ></span>

        <span>Add New Class</span>
      </button>
    </div>

    <Table :columns="columns" :data="classItem" />

    <Dialog
      as="div"
      :open="isOpen"
      @close="closeModal"
      class="relative z-10 transition-all duration-1000"
    >
      <div class="fixed inset-0 bg-black bg-opacity-25" />

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all duration-1000"
          >
            <div class="d-flex">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Add New Class Entry
              </DialogTitle>
              <button @click="closeModal()">close</button>
            </div>

            <!--ClassName-->
            <div class="col-span-full">
              <label
                for="street-address"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Classname</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="classname"
                  autocomplete="name"
                  class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 flex-1"
                />
              </div>
              <!--classtype-->
              <div class="col-span-full">
                <label
                  for="street-address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Class-type</label
                >
                <div class="mt-2">
                  <BaseSelect
                    v-model:value="classtypeId"
                    :options="classtypeItem"
                    defaultText="Select Order Status"
                    textProperty="classtype_name"
                    valueProperty="classtypeId"
                    keyProperty="classtypeId"
                    class="w-50"
                  />
                </div>
              </div>
              <!--class teacher-->
              <div class="col-span-full">
                <label
                  for="street-address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Class Teacher</label
                >
                <div class="mt-2">
                  <BaseSelect
                    v-model:value="id"
                    :options="teacherName"
                    defaultText="Select Order Status"
                    textProperty="name"
                    valueProperty="id"
                    keyProperty="id"
                    class="w-50"
                  />
                </div>
              </div>
            </div>

            <div class="mt-4">
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="submit()"
              >
                Submit
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useClasstypeStore } from "~~/store/classtype";
import { useTeacherStore, newTeacher } from "~~/store/teachers";

import { Classes, useClassStore } from "../store/class";

export default defineComponent({
  setup() {
    const classes = useClassStore();

    const teachers = useTeacherStore();

    const classtype = useClasstypeStore();

    const classItem = computed(() => classes.$state.classes.classes);

    const teacherItem = computed(() => teachers.$state.teachers.teachers);

    const teacherSuccess = computed(() => teachers.$state.success).value;

    const loading = computed(() => classes.$state.loading);

    const success = computed(() => classes.$state.success).value;

    const classtypeItem = computed(() => classtype.$state.classtype.classtype);

    const isOpen = ref(false);

    const closeModal = () => {
      isOpen.value = false;
    };
    const openModal = () => {
      isOpen.value = true;
    };

    const toggleModal = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      classes,
      teachers,
      classtype,
      classItem,
      teacherItem,
      classtypeItem,
      isOpen,
      closeModal,
      openModal,
      toggleModal,
      teacherSuccess,
      loading,
      success,
    };
  },
  data() {
    return {
      search: "",
      columns: [
        { id: 1, label: "Classname", field: "classname" },
        { id: 2, label: "Class-Type", field: "classtype_name" },
        { id: 3, label: "Teacher-firstname", field: "teacher_firstname" },
        { id: 3, label: "Teacher-lastname", field: "teacher_lastname" },
      ],
      classname: "",
      id: 0,
      classtypeId: 0,
      teacherName: [] as any[],
    };
  },
  methods: {
    updateSearchString(searchString: string) {
      this.search = searchString;
      console.log(searchString);
    },
    async submit() {
      const details = {
        classname: this.classname,
        teacherId: this.id,
        classtypeId: this.classtypeId,
      };

      await this.classes.addClass(details);
      if (this.success == true) {
        this.closeModal();
        this.classes.getClasss();
      }
    },
    teacherFullname() {
      console.log("check", this.teacherSuccess);
      if (this.teacherSuccess == true) {
        this.teacherItem.map((teacher) => {
          this.teacherName.push({
            name: teacher.teacher_firstname + " " + teacher.teacher_lastname,
            id: teacher.teacherId,
          });
        });
        console.log("fullname", this.teacherName);
      } else {
        console.log("problem");
      }
    },
  },
  mounted() {
    this.classes.getClasss();
    this.classtype.getClasstypes();
    this.teachers.getTeachers();
    this.teacherFullname();
  },
});
</script>
