<script setup lang="ts">
import CompareTable from "@/components/loan/CompareTable.vue";
import { onMounted, ref, reactive } from "vue";
import { useLoanCalculator } from "@/composables/useLoanCalculator";
import type { LoanForm, Summary } from "@/types/loan";

type LoanSummaryItem = LoanForm & {
  id: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
};

const loanList = ref<LoanSummaryItem[]>([]);
const store = useLoanStore();

onMounted(() => {
  if (typeof window !== "undefined") {
    try {
      const saved = store.forms || [];

      if (Array.isArray(saved)) {
        for (const item of saved) {
          const form = reactive<LoanForm>({ ...item.form });
          const calc = useLoanCalculator(form, item.id);
          calc.calculate();

          loanList.value.push({
            id: item.id,
            amount: form.amount,
            interestRate: form.interestRate,
            termYears: form.termYears,
            termMonths: form.termMonths,
            startDate: form.startDate,
            monthlyPayment: calc.result.monthlyPayment,
            totalInterest: calc.result.totalInterest,
            totalPayment: calc.result.totalPayment,
          });
        }
      }
    } catch (e) {
      console.error("Error loading loan data:", e);
    }
  }
});
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <CompareTable :loans="loanList" />
  </div>
</template>
