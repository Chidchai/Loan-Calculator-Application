<template>
  <div class="mt-8 space-y-4">
    <h3 class="text-lg font-semibold">ผลการคำนวณ</h3>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="border rounded-md p-4 text-center">
        <div class="text-sm text-muted-foreground">ยอดผ่อนต่อเดือน</div>
        <div class="text-xl font-bold">THB {{ format(summary.monthlyPayment) }}</div>
      </div>

      <div class="border rounded-md p-4 text-center">
        <div class="text-sm text-muted-foreground">ดอกเบี้ยรวม</div>
        <div class="text-xl font-bold">THB {{ format(summary.totalInterest) }}</div>
      </div>

      <div class="border rounded-md p-4 text-center">
        <div class="text-sm text-muted-foreground">ยอดชำระทั้งหมด</div>
        <div class="text-xl font-bold">THB {{ format(summary.totalPayment) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { format } = useFormat();
const props = defineProps<{
  summary: {
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  };
}>();
</script>
