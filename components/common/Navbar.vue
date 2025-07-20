<script setup lang="ts">
import { ref } from "vue";
import { NuxtLink } from "#components";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";

const isMenuOpen = ref(false);
const theme = useThemeStore();
const { logout } = useAuth();
</script>

<template>
  <header class="flex justify-between items-center px-6 py-3 border-b shadow-sm">
    <div class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-black" viewBox="0 0 24 24">
        <path d="M5 3h14a2 2 0 0 1 2 2v3H3V5a2 2 0 0 1 2-2Zm16 7H3v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9Zm-9 8H6v-2h6v2Zm0-4H6v-2h6v2Z" />
      </svg>
      <span class="font-bold text-lg">LoanCompare</span>
    </div>
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium relative">
      <NuxtLink
        to="/"
        class="relative pb-2 font-medium"
        exact-active-class="text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-500 after:rounded-full after:transition-all after:duration-300"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/calculator"
        class="relative pb-2 font-medium"
        active-class="text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-500 after:rounded-full after:transition-all after:duration-300"
      >
        Calculators
      </NuxtLink>
      <NuxtLink
        to="/comparison"
        class="relative pb-2 font-medium"
        active-class="text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-500 after:rounded-full after:transition-all after:duration-300"
      >
        Comparison
      </NuxtLink>
    </nav>

    <div class="flex items-center">
      <Button variant="outline" @click="theme.toggleTheme" class="relative mr-4">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Theme ({{ theme.current }})</span>
      </Button>

      <Button variant="outline" @click="logout">Logout </Button>
    </div>

    <div class="md:hidden">
      <Button variant="ghost" class="p-2" @click="isMenuOpen = !isMenuOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
    </div>
  </header>

  <div v-if="isMenuOpen" class="md:hidden px-6 pb-4">
    <nav class="flex flex-col gap-2 text-sm font-medium">
      <NuxtLink
        to="/"
        class="relative pb-2"
        exact-active-class="text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-500 after:rounded-full"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/calculator"
        class="relative pb-2"
        active-class="text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-500 after:rounded-full"
      >
        Calculators
      </NuxtLink>
      <NuxtLink
        to="/comparison"
        class="relative pb-2"
        active-class="text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-red-500 after:rounded-full"
      >
        Comparison
      </NuxtLink>

      <div class="mt-2">
        <Button variant="outline" @click="logout">Logout </Button>
      </div>
    </nav>
  </div>
</template>
