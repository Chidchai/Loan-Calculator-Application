<script setup lang="ts">
import Navbar from "~/components/common/Navbar.vue";
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
