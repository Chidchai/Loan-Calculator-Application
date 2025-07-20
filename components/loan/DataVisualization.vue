<script setup lang="ts">
import ChartBar from "@/components/charts/ChartBar.vue";
import ChartLine from "@/components/charts/ChartLine.vue";
import ChartPie from "@/components/charts/ChartPie.vue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, TrendingDown } from "lucide-vue-next";
import type { BarChartData, LineChartData, PieChartData } from "@/types/loan";

const props = defineProps<{
  barData: BarChartData;
  pieData: PieChartData;
  lineData: LineChartData;
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card class="border rounded-xl shadow-sm">
      <CardHeader class="bg-muted px-4 py-3 border-b">
        <div class="flex items-center gap-2">
          <BarChart v-if="barData?.labels" :data="barData" />
          <div>
            <CardTitle class="text-base font-semibold text-primary">ดอกเบี้ยรายปี</CardTitle>
            <CardDescription class="text-sm text-muted-foreground">รวมดอกเบี้ยในแต่ละปี</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent class="h-[300px]">
        <ChartBar :data="props.barData" />
      </CardContent>
    </Card>

    <Card class="border rounded-xl shadow-sm">
      <CardHeader class="bg-muted px-4 py-3 border-b">
        <CardTitle class="flex items-center gap-2 text-base font-semibold text-primary">
          <PieChart v-if="pieData?.labels" :data="pieData" />
          สัดส่วนเงินต้น-ดอกเบี้ย
        </CardTitle>
        <CardDescription class="text-sm text-muted-foreground"> เปรียบเทียบสัดส่วนค่าใช้จ่าย </CardDescription>
      </CardHeader>
      <CardContent class="h-[300px]">
        <ChartPie :data="props.pieData" />
      </CardContent>
    </Card>

    <Card class="border rounded-xl shadow-sm">
      <CardHeader class="bg-muted px-4 py-3 border-b">
        <div class="flex items-center gap-2">
          <TrendingDown class="w-5 h-5 text-sky-500" />
          <div>
            <CardTitle class="text-base font-semibold text-primary">ยอดหนี้คงเหลือรายเดือน</CardTitle>
            <CardDescription class="text-sm text-muted-foreground">ลดลงตามการชำระเงิน</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent class="h-[300px]">
        <ChartLine :data="props.lineData" />
      </CardContent>
    </Card>
  </div>
</template>
