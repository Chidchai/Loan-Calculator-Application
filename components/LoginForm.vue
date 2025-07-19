<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast as sonnerToast } from "vue-sonner";

import { ref } from "vue";
const email = ref("");
const password = ref("");
const loading = ref(false);
const { supabase } = useAuth();
const handleLogin = async () => {
  loading.value = true;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.log(error);
      sonnerToast.error("เข้าสู่ระบบล้มเหลว" + `${error}`, { description: error });
      return;
    }

    sonnerToast.success("เข้าสู่ระบบสำเร็จ");
    await navigateTo("/");
  } catch (error) {
    console.log(error);
    sonnerToast.error("เข้าสู่ระบบล้มเหลว " + `${error}`, { description: `${error}` });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Card class="mx-auto max-w-xl">
    <CardHeader>
      <CardTitle class="text-2xl"> Login </CardTitle>
    </CardHeader>
    <form @submit.prevent="handleLogin">
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" v-model="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <Input id="password" type="password" v-model="password" required />
          </div>
          <Button type="submit" class="w-full" :disabled="loading">
            <template v-if="loading">
              <svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Logging in...
            </template>
            <template v-else> Login </template>
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/register" class="underline underline-offset-4"> Sign up </NuxtLink>
        </div>
      </CardContent>
    </form>
  </Card>
</template>
