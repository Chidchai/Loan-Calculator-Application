<script setup lang="ts">
import { ref, computed } from "vue";
import { useLoanStore } from "@/stores/useLoanStore";
import { useLoanCalculator } from "@/composables/useLoanCalculator";

import LoanForm from "@/components/loan/LoanForm.vue";
import LoanSummary from "@/components/loan/LoanSummary.vue";
import DataVisualization from "@/components/loan/DataVisualization.vue";
import LoanAmortizationTable from "@/components/loan/LoanAmortizationTable.vue";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { Summary } from "@/types/loan";

const store = useLoanStore();

const activeTab = ref(`form-${store.forms[0]?.id ?? 1}`);
const activeFormId = computed(() => {
  const id = parseInt(activeTab.value.replace("form-", ""));
  return isNaN(id) ? store.forms[0]?.id ?? 1 : id;
});

// calculators ที่ผูกกับแต่ละ form
const calculators = computed(() => {
  const result: Record<number, ReturnType<typeof useLoanCalculator>> = {};
  for (const f of store.forms) {
    result[f.id] = useLoanCalculator(f.form, f.id);
  }
  return result;
});

// summary ต่อ form
const summaries = computed<Record<number, Summary>>(() => {
  const result: Record<number, Summary> = {};
  for (const f of store.forms) {
    const c = calculators.value[f.id];
    result[f.id] = {
      monthlyPayment: c.result.monthlyPayment,
      totalInterest: c.result.totalInterest,
      totalPayment: c.result.totalPayment,
      amortizationSchedule: c.amortizationSchedule,
      pieChartData: c.pieChartData.value,
      lineChartData: c.lineChartData.value,
      barChartData: c.barChartData.value,
    };
  }
  return result;
});

// เพิ่มฟอร์มใหม่
function addForm() {
  const nextId = store.forms.length ? Math.max(...store.forms.map((f) => f.id)) + 1 : 1;
  store.addForm(
    {
      amount: 0,
      interestRate: 0,
      termYears: 0,
      termMonths: 0,
      startDate: "",
    },
    nextId
  );
  activeTab.value = `form-${nextId}`;
}

// ลบฟอร์ม
function handleRemove(id: number) {
  store.removeForm(id);
  if (activeFormId.value === id) {
    const first = store.forms[0];
    if (first) activeTab.value = `form-${first.id}`;
    else addForm();
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Loan Comparisons</h2>
      <Button @click="addForm">+ เพิ่มสินเชื่อ</Button>
    </div>

    <Tabs v-model="activeTab" class="w-full">
      <TabsList>
        <TabsTrigger v-for="form in store.forms" :key="form.id" :value="`form-${form.id}`" class="flex items-center gap-2">
          สินเชื่อ {{ form.id }}
          <button v-if="store.forms.length > 0" @click.stop="handleRemove(form.id)" class="text-red-500 hover:text-red-700 text-xs">✕</button>
        </TabsTrigger>
      </TabsList>

      <TabsContent v-for="form in store.forms" :key="form.id" :value="`form-${form.id}`" class="pt-4">
        <LazyLoanForm :form="form.form" :formName="`สินเชื่อ ${form.id}`" :formId="form.id" />
      </TabsContent>
    </Tabs>

    <NuxtLink to="/comparison">
      <Button variant="default">เปรียบเทียบสินเชื่อ</Button>
    </NuxtLink>

    <LazyLoanSummary
      :summary="
        summaries[activeFormId] || {
          monthlyPayment: 0,
          totalInterest: 0,
          totalPayment: 0,
        }
      "
    />

    <DataVisualization
      :barData="summaries[activeFormId]?.barChartData"
      :pieData="summaries[activeFormId]?.pieChartData"
      :lineData="summaries[activeFormId]?.lineChartData"
    />

    <LazyLoanAmortizationTable :schedule="summaries[activeFormId]?.amortizationSchedule || []" />
  </div>
</template>
