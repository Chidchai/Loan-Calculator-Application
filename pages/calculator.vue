<script setup lang="ts">
import { ref } from "vue";
import LoanForm from "@/components/loan/LoanForm.vue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Button } from "@/components/ui/button";

const forms = ref([{ id: 1 }]);
const activeTab = ref("form-1");

function addForm() {
  const nextId = forms.value.length + 1;
  const newId = `form-${nextId}`;
  forms.value.push({ id: nextId });
  activeTab.value = newId;
}

const calculated = reactive({
  monthlyPayment: 0,
  totalInterest: 0,
  totalPayment: 0,
});

const amortizationSchedule = [
  {
    month: 1,
    paymentDate: "01/01/2024",
    startingBalance: 1000000,
    payment: 10000,
    principal: 5000,
    interest: 5000,
    endingBalance: 995000,
  },
  {
    month: 1,
    paymentDate: "01/01/2024",
    startingBalance: 1000000,
    payment: 10000,
    principal: 5000,
    interest: 5000,
    endingBalance: 995000,
  },
  {
    month: 1,
    paymentDate: "01/01/2024",
    startingBalance: 1000000,
    payment: 10000,
    principal: 5000,
    interest: 5000,
    endingBalance: 995000,
  },
  {
    month: 1,
    paymentDate: "01/01/2024",
    startingBalance: 1000000,
    payment: 10000,
    principal: 5000,
    interest: 5000,
    endingBalance: 995000,
  },
  {
    month: 1,
    paymentDate: "01/01/2024",
    startingBalance: 1000000,
    payment: 10000,
    principal: 5000,
    interest: 5000,
    endingBalance: 995000,
  },
  {
    month: 1,
    paymentDate: "01/01/2024",
    startingBalance: 1000000,
    payment: 10000,
    principal: 5000,
    interest: 5000,
    endingBalance: 995000,
  },
  {
    month: 1,
    paymentDate: "01/01/2024",
    startingBalance: 1000000,
    payment: 10000,
    principal: 5000,
    interest: 5000,
    endingBalance: 995000,
  },
];
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Loan Comparisons</h2>
      <Button @click="addForm">+ เพิ่มสินเชื่อ</Button>
    </div>

    <Tabs v-model="activeTab" class="w-full">
      <TabsList>
        <TabsTrigger v-for="form in forms" :key="form.id" :value="`form-${form.id}`"> สินเชื่อ {{ form.id }} </TabsTrigger>
      </TabsList>

      <TabsContent v-for="form in forms" :key="form.id" :value="`form-${form.id}`" class="pt-4">
        <LoanForm :formName="`สินเชื่อ ${form.id}`" />
      </TabsContent>
    </Tabs>

    <LoanSummary
      :summary="{
        monthlyPayment: calculated.monthlyPayment,
        totalInterest: calculated.totalInterest,
        totalPayment: calculated.totalPayment,
      }"
    />

    <LoanAmortizationTable :schedule="amortizationSchedule" />
  </div>
</template>
