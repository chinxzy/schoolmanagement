<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const collapsed = ref(false);

const navItems = [
  { to: "/", label: "Dashboard", icon: "🏠" },
  { to: "/teachers", label: "Teachers", icon: "👩‍🏫" },
  { to: "/students", label: "Students", icon: "🎓" },
  { to: "/subjects", label: "Subjects", icon: "📚" },
  { to: "/classes", label: "Classes", icon: "🏫" },
  { to: "/class-type", label: "Class Types", icon: "🏷️" },
];

const isActive = (to: string) =>
  to === "/" ? route.path === "/" : route.path.startsWith(to);
</script>

<template>
  <aside
    :class="[
      'flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300',
      collapsed ? 'w-16' : 'w-56',
    ]"
  >
    <!-- Logo area -->
    <div
      class="flex h-16 items-center justify-between px-4 border-b border-sidebar-border"
    >
      <span v-if="!collapsed" class="text-lg font-bold tracking-tight"
        >SchoolMS</span
      >
      <button
        class="ml-auto rounded-md p-1 hover:bg-sidebar-accent"
        @click="collapsed = !collapsed"
        :title="collapsed ? 'Expand' : 'Collapse'"
      >
        <span class="text-lg">{{ collapsed ? "→" : "←" }}</span>
      </button>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-4 space-y-1 px-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive(item.to)
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        ]"
      >
        <span class="text-xl leading-none">{{ item.icon }}</span>
        <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
