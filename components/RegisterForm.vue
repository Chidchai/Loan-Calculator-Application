<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast as sonnerToast } from "vue-sonner";

const email = ref("");
const password = ref("");

const pending = ref(false);

const { supabase } = useAuth();

const handleRegister = async () => {
  pending.value = true;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      sonnerToast.success("เกิดข้อผิดพลาดในการสมัคร");
    } else {
      sonnerToast.success("สมัครสมาชิกสำเร็จ");
      email.value = "";
      password.value = "";

      await navigateTo("/login");
    }
  } catch (err) {
    sonnerToast.error("เกิดข้อผิดพลาดในการสมัคร");
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">Register</CardTitle>
      <CardDescription>Enter your email below to create a new account.</CardDescription>
    </CardHeader>

    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
      </div>

      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" v-model="password" required />
      </div>
    </CardContent>

    <CardFooter>
      <Button class="w-full" @click="handleRegister" :disabled="pending">
        {{ pending ? "กำลังสมัคร..." : "สมัครสมาชิก" }}
      </Button>
    </CardFooter>
  </Card>
</template>
