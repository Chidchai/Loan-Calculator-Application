<script setup lang="ts">
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const props = defineProps<{
  loans: {
    id: number;
    form: {
      amount: number;
      interestRate: number;
      termYears: number;
      termMonths: number;
      monthlyPayment: number;
      totalInterest: number;
      totalPayment: number;
    };
  }[];
}>();

// ค่าต่ำสุด / สูงสุด
const minRate = computed(() => Math.min(...props.loans.map((l) => l.form.interestRate)));
const maxRate = computed(() => Math.max(...props.loans.map((l) => l.form.interestRate)));

const minMonthly = computed(() => Math.min(...props.loans.map((l) => l.form.monthlyPayment)));
const maxMonthly = computed(() => Math.max(...props.loans.map((l) => l.form.monthlyPayment)));

const minTotalPayment = computed(() => Math.min(...props.loans.map((l) => l.form.totalPayment)));
const maxTotalPayment = computed(() => Math.max(...props.loans.map((l) => l.form.totalPayment)));

function getHighlightClass(value: number, min: number, max: number) {
  if (Math.abs(value - min) < 0.01) return "text-green-600 font-bold";
  if (Math.abs(value - max) < 0.01) return "text-red-600 font-bold";
  return "";
}
</script>

<template>
  <div class="overflow-auto border rounded-xl shadow-sm bg-white dark:bg-zinc-900">
    <Table>
      <TableHeader>
        <TableRow class="bg-zinc-100 dark:bg-zinc-800">
          <TableHead class="w-48 font-semibold">รายการเปรียบเทียบ</TableHead>
          <TableHead v-for="loan in loans" :key="loan.id" class="text-center font-semibold"> สินเชื่อ {{ loan.id }} </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <!-- วงเงิน -->
        <TableRow>
          <TableCell>วงเงิน</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right">
            {{ loan.form.amount.toLocaleString() }}
          </TableCell>
        </TableRow>

        <!-- ดอกเบี้ย -->
        <TableRow>
          <TableCell>ดอกเบี้ย/ปี</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right" :class="getHighlightClass(loan.form.interestRate, minRate, maxRate)">
            {{ loan.form.interestRate }}%
          </TableCell>
        </TableRow>

        <!-- งวด/เดือน -->
        <TableRow>
          <TableCell>งวด/เดือน</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right">
            {{ loan.form.termYears * 12 + loan.form.termMonths }}
          </TableCell>
        </TableRow>

        <!-- ยอดผ่อน/เดือน -->
        <TableRow>
          <TableCell>ยอดผ่อน/เดือน</TableCell>
          <TableCell
            v-for="loan in loans"
            :key="loan.id"
            class="text-right"
            :class="getHighlightClass(loan.form.monthlyPayment, minMonthly, maxMonthly)"
          >
            {{ loan.form.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
          </TableCell>
        </TableRow>

        <!-- ดอกเบี้ยรวม -->
        <TableRow>
          <TableCell>ดอกเบี้ยรวม</TableCell>
          <TableCell v-for="loan in loans" :key="loan.id" class="text-right">
            {{ loan.form.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
          </TableCell>
        </TableRow>

        <!-- ยอดชำระรวม -->
        <TableRow>
          <TableCell>ยอดชำระรวม</TableCell>
          <TableCell
            v-for="loan in loans"
            :key="loan.id"
            class="text-right"
            :class="getHighlightClass(loan.form.totalPayment, minTotalPayment, maxTotalPayment)"
          >
            {{ loan.form.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
