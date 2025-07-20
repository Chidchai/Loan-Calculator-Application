<script setup lang="ts">
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const props = defineProps<{
  loans: {
    amount: number;
    interestRate: number;
    termYears: number;
    termMonths: number;
    startDate?: string | undefined;
    id: number;
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  }[];
}>();

// ค่าต่ำสุด / สูงสุด
const minRate = computed(() => Math.min(...props.loans.map((l) => l.interestRate)));
const maxRate = computed(() => Math.max(...props.loans.map((l) => l.interestRate)));

const minMonthly = computed(() => Math.min(...props.loans.map((l) => l.monthlyPayment)));
const maxMonthly = computed(() => Math.max(...props.loans.map((l) => l.monthlyPayment)));

const minTotalPayment = computed(() => Math.min(...props.loans.map((l) => l.totalPayment)));
const maxTotalPayment = computed(() => Math.max(...props.loans.map((l) => l.totalPayment)));

function getHighlightClass(value: number, min: number, max: number) {
  if (Math.abs(value - min) < 0.01) return "text-green-600 font-bold";
  if (Math.abs(value - max) < 0.01) return "text-red-600 font-bold";
  return "";
}
</script>

<template>
  <h3 class="text-lg font-semibold mb-4">ตารางเปรียบเทียบ</h3>
  <div class="overflow-auto border rounded-xl shadow-sm bg-white dark:bg-zinc-900">
    <Table>
      <TableHeader>
        <TableRow class="bg-zinc-100 dark:bg-zinc-800">
          <TableHead class="w-48 font-semibold">รายการเปรียบเทียบ</TableHead>
          <TableHead v-for="loan in loans" :key="loan.id" class="text-center font-semibold"> สินเชื่อ {{ loan.id }} </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>วงเงิน</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right">
            {{ loan.amount.toLocaleString() }}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>ดอกเบี้ย/ปี</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right" :class="getHighlightClass(loan.interestRate, minRate, maxRate)">
            {{ loan.interestRate }}%
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>งวด/เดือน</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right">
            {{ loan.termYears * 12 + loan.termMonths }}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>ยอดผ่อน/เดือน</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right" :class="getHighlightClass(loan.monthlyPayment, minMonthly, maxMonthly)">
            {{ loan.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>ดอกเบี้ยรวม</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right">
            {{ loan.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>ยอดชำระรวม</TableCell>
          <TableCell
            v-for="loan in loans"
            :key="loan.id"
            class="text-right"
            :class="getHighlightClass(loan.totalPayment, minTotalPayment, maxTotalPayment)"
          >
            {{ loan.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
