<script setup lang="ts">
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

defineProps<{
  data: any;
  options?: any;
}>();
</script>

<template>
  <div class="h-full">
    <Pie :data="data" :options="options" />
  </div>
</template>
