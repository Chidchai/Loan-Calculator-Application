<script setup lang="ts">
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register chart.js modules
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineProps<{
  data: any;
}>();
</script>

<template>
  <Bar :data="data" />
</template>
