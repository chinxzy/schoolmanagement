<template>
  <div class="bg-slate-50">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div
        :class="{
          'bg-logoColor': true,
          'text-white': true,
          'w-40': !collapsed,
          'w-20': collapsed,
          'top-0 ': true,
          'left-0': true,
          'bottom-0': true,
          'transition-all': true,
          'duration-1000': true,
          'z-0': true,
          'p-4': true,
          'shadow-2xl': true,
          'border-gray-100': true,
          'h-screen': true,
        }"
      >
        <div class="py-2 mb-20">
          <img src="/logo.png" width="50" class="fixed" />
          <button class="fixed" @click="toggleCollapse()">
            <font-awesome-icon
              icon="fa-solid fa-angles-right"
              :class="{
                'text-2xl': true,
                'text-white': true,
                'mr-6': true,
                'text-neutral-900': true,
                'transition-all': true,
                'ease-in-out': true,
                'delay-150': true,
                'hover:translate-x-4': collapsed,
                'duration-500': true,
                'rotate-180': !collapsed,
                'left-20': !collapsed,
                'top-3': !collapsed,
                'top-20': collapsed,
                relative: true,
              }"
            />
          </button>
        </div>
        <ul class="text-gray-900 space-x-90 fixed text-white mt-20">
          <li class="mb-16">
            <NuxtLink to="/"
              ><span
                ><font-awesome-icon
                  icon="fa-solid fa-house"
                  class="text-3xl mr-8 text-white" /></span
              ><span class="relative bottom-1">Home</span></NuxtLink
            >
          </li>
          <li class="mb-16">
            <NuxtLink to="teachers"
              ><span
                ><font-awesome-icon
                  icon="fa-solid fa-chalkboard-user"
                  class="text-3xl mr-8 text-white" /></span
              ><span class="relative bottom-1">Teachers</span></NuxtLink
            >
          </li>
          <li class="mb-16">
            <NuxtLink to="/subjects"
              ><span
                ><font-awesome-icon
                  icon="fa-solid fa-book-open"
                  class="text-3xl mr-8 text-white" /></span
              ><span class="relative bottom-1">Subects</span></NuxtLink
            >
          </li>
          <li class="mb-16">
            <NuxtLink to="/class"
              ><span
                ><font-awesome-icon
                  icon="fa-solid fa-school"
                  class="text-3xl mr-8 text-white" /></span
              ><span class="relative bottom-1">Classes</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <!-- Content -->
      <div class="flex-1 bg-neutral-50 z-50">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const collapsed = ref(false);
    const toggleCollapse = () => {
      collapsed.value = !collapsed.value;
    };
    return {
      toggleCollapse,
      collapsed,
    };
  },
});
</script>

