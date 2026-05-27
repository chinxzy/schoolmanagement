<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";

const router = useRouter();
const auth = useAuthStore();

const email = ref("");
const password = ref("");

async function handleLogin() {
  if (!email.value || !password.value) return;
  await auth.login(email.value, password.value);
  if (auth.isAuthenticated) {
    router.push("/");
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/40">
    <div
      class="w-full max-w-md space-y-6 rounded-2xl border bg-card p-8 shadow-lg"
    >
      <!-- Logo / Branding -->
      <div class="text-center space-y-1">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground font-bold"
        >
          S
        </div>
        <h1 class="text-2xl font-bold tracking-tight">School Management</h1>
        <p class="text-sm text-muted-foreground">
          Sign in to your admin account
        </p>
      </div>

      <!-- Error banner -->
      <div
        v-if="auth.error"
        class="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive"
      >
        {{ auth.error }}
      </div>

      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleLogin">
        <div class="space-y-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="admin@school.edu"
            autocomplete="email"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <Button type="submit" class="w-full" :disabled="auth.loading">
          {{ auth.loading ? "Signing in…" : "Sign in" }}
        </Button>
      </form>
    </div>
  </div>
</template>
