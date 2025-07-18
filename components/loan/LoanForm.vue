<script setup lang="ts">
import { reactive, watch } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoanCalculator } from "@/composables/useLoanCalculator";

const emit = defineEmits(["update:summary"]);
const props = defineProps<{ formName?: string; formId: number }>();

const form = reactive({
  amount: 0,
  interestRate: 0,
  termYears: 0,
  termMonths: 0,
  startDate: "",
});

const { result, pieChartData, lineChartData, barChartData, amortizationSchedule } = useLoanCalculator(form, props.formId);

watch(
  result,
  () => {
    emit("update:summary", { ...result, pieChartData, lineChartData, barChartData, amortizationSchedule });
  },
  { immediate: true }
);
</script>

<template>
  <form class="space-y-6 max-w-md">
    <div>
      <h2 class="text-2xl font-semibold">{{ props.formName }}</h2>
    </div>

    <div class="space-y-1">
      <Label for="amount">ยอดเงินกู้</Label>
      <Input id="amount" type="number" v-model.number="form.amount" min="100000" max="10000000" placeholder="100,000 - 10,000,000" />
    </div>

    <div class="space-y-1">
      <Label for="interestRate">อัตราดอกเบี้ยต่อปี (1-20%)</Label>
      <Input id="interestRate" type="number" v-model.number="form.interestRate" min="1" max="20" step="0.01" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <Label for="termYears">ระยะเวลากู้ (ปี)</Label>
        <Input id="termYears" type="number" v-model.number="form.termYears" min="0" max="30" />
      </div>
      <div class="space-y-1">
        <Label for="termMonths">ระยะเวลากู้ (เดือน)</Label>
        <Input id="termMonths" type="number" v-model.number="form.termMonths" min="0" max="11" />
      </div>
    </div>

    <div class="space-y-1">
      <Label for="startDate">วันที่เริ่มต้นสัญญา</Label>
      <Input id="startDate" type="date" v-model="form.startDate" />
    </div>
  </form>
</template>
