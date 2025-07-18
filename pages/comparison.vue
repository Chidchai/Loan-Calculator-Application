<script setup lang="ts">
import CompareTable from "@/components/loan/CompareTable.vue";
import { onMounted, reactive } from "vue";
import { useLoanCalculator } from "@/composables/useLoanCalculator";

const loanList: {
  id: number;
  form: any;
}[] = reactive([]);

onMounted(() => {
  if (typeof window !== "undefined") {
    const saved = JSON.parse(localStorage.getItem("loan-forms") || "[]");

    for (const item of saved) {
      const form = reactive({ ...item.form });

      const calc = useLoanCalculator(form, item.id);
      calc.calculate();

      loanList.push({
        id: item.id,
        form: {
          ...form,
          monthlyPayment: calc.result.monthlyPayment,
          totalInterest: calc.result.totalInterest,
          totalPayment: calc.result.totalPayment,
        },
      });
    }
  }
});
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <CompareTable :loans="loanList" />
  </div>
</template>
