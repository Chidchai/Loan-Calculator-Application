<script setup>
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <slot />
    <Toaster position="top-right" richColors />
  </div>
</template>
