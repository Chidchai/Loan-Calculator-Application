<script setup lang="ts">
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

defineProps<{
  data: any;
  options?: any;
}>();
</script>

<template>
  <div class="h-full">
    <Line :data="data" :options="options" />
  </div>
</template>
