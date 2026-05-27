<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import AppNavbar from "@/components/AppNavbar.vue";

const route = useRoute();
const isPublicRoute = computed(() => route.meta.public === true);
</script>

<template>
  <!-- Public pages (login) render without chrome -->
  <RouterView v-if="isPublicRoute" />

  <!-- Authenticated shell -->
  <div v-else class="flex h-screen overflow-hidden bg-background">
    <AppSidebar />
    <div class="flex flex-1 flex-col overflow-hidden">
      <AppNavbar />
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
