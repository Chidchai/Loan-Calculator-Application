<script setup>
import { ref } from "vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const isMenuOpen = ref(false);
</script>

<template>
  <header class="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm rounded-b-lg">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-black" viewBox="0 0 24 24">
        <path d="M5 3h14a2 2 0 0 1 2 2v3H3V5a2 2 0 0 1 2-2Zm16 7H3v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9Zm-9 8H6v-2h6v2Zm0-4H6v-2h6v2Z" />
      </svg>
      <span class="font-bold text-lg">LoanCompare</span>
    </div>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
      <NuxtLink to="/" exact-active-class="text-primary">Home</NuxtLink>
      <NuxtLink to="/calculator" active-class="text-primary">Calculators</NuxtLink>
      <NuxtLink to="/comparison" active-class="text-primary">Comparison</NuxtLink>
    </nav>

    <!-- User dropdown -->
    <div class="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="flex items-center gap-2 px-2">
            <Avatar class="w-8 h-8">
              <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Mobile Hamburger -->
    <div class="md:hidden">
      <button @click="isMenuOpen = !isMenuOpen" class="focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div v-if="isMenuOpen" class="md:hidden px-6 pb-4">
    <nav class="flex flex-col gap-2 text-sm font-medium">
      <NuxtLink to="/" exact-active-class="text-primary">Home</NuxtLink>
      <NuxtLink to="/calculator" active-class="text-primary">Calculators</NuxtLink>
      <NuxtLink to="/comparison" active-class="text-primary">Comparison</NuxtLink>
      <div class="mt-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="flex items-center gap-2 px-2 w-full justify-start">
              <Avatar class="w-6 h-6">
                <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              Profile
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  </div>
</template>
