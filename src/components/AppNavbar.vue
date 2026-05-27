<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/ui/Button.vue";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    "/": "Dashboard",
    "/teachers": "Teachers",
    "/students": "Students",
    "/subjects": "Subjects",
    "/classes": "Classes",
  };
  return map[route.path] ?? "School Management";
});

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b bg-white px-6">
    <h1 class="text-lg font-semibold text-foreground">{{ pageTitle }}</h1>
    <div class="flex items-center gap-3">
      <div
        class="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold"
      >
        A
      </div>
      <span class="text-sm font-medium">Admin</span>
      <Button variant="ghost" size="sm" @click="logout">Sign out</Button>
    </div>
  </header>
</template>
