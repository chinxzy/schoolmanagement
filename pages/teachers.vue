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

        <span>Add New Teachers</span>
      </button>
    </div>

    <div v-if="loading == true" class="container text-center">
      <h1>LOADING</h1>
    </div>

    <Table v-if="success == true" :columns="columns" :data="teacherItem" />

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
            <DialogTitle
              as="h3"
              class="text-lg font-medium leading-6 text-gray-900"
            >
              New Teacher entry
            </DialogTitle>
            <!--Name-->
            <div class="col-span-full">
              <label
                for="street-address"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Firstname</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="teacher_firstname"
                  autocomplete="street-address"
                  class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 flex-1"
                />
              </div>
              <!--lastname-->
              <div class="col-span-full">
                <label
                  for="street-address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Lastname</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    v-model="teacher_lastname"
                    autocomplete="street-address"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <!--gender-->
              <div class="col-span-full">
                <label
                  for="street-address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Gender</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    v-model="gender"
                    autocomplete="street-address"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

import { Teachers, useTeacherStore } from "../store/teachers";

export default defineComponent({
  setup() {
    const teachers = useTeacherStore();

    const teacherItem = computed(() => teachers.$state.teachers.teachers);

    const loading = computed(() => teachers.$state.loading);

    const success = computed(() => teachers.$state.success);

    const isOpen = ref(false);

    console.log("loading", success);

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
      teachers,
      teacherItem,
      isOpen,
      closeModal,
      openModal,
      toggleModal,
      loading,
      success,
    };
  },
  data() {
    return {
      search: "",
      columns: [
        { id: 1, label: "Firstname", field: "teacher_firstname" },
        { id: 2, label: "Lastname", field: "teacher_lastname" },
        { id: 3, label: "Gender", field: "gender" },
      ],
      teacher_firstname: "",
      teacher_lastname: "",
      gender: "",
    };
  },
  methods: {
    updateSearchString(searchString: string) {
      this.search = searchString;
      console.log(searchString);
    },

    submit() {
      const details = {
        teacher_firstname: this.teacher_firstname,
        teacher_lastname: this.teacher_lastname,
        gender: this.gender,
      };
      console.log("details", details);
      this.teachers.addTeachers(details);
      if (this.success == true) {
        this.closeModal();
      } else {
        console.log("error");
      }
    },
  },
  mounted() {
    this.teachers.getTeachers();
  },
});
</script>
