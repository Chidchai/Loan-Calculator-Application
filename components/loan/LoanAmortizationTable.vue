<template>
  <div class="space-y-4 pt-4">
    <h3 class="text-lg font-semibold mb-4">ตารางแสดงรายละเอียดการผ่อนชำระ (Amortization Schedule)</h3>
    <div class="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>งวดที่</TableHead>
            <TableHead>วันที่ชำระ</TableHead>
            <TableHead>ยอดต้นคงเหลือต้นงวด</TableHead>
            <TableHead>ยอดผ่อน</TableHead>
            <TableHead>เงินต้น</TableHead>
            <TableHead>ดอกเบี้ย</TableHead>
            <TableHead>ยอดคงเหลือปลายงวด</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in paginatedData" :key="item.month">
            <TableCell>{{ item.month }}</TableCell>
            <TableCell>{{ item.paymentDate }}</TableCell>
            <TableCell>฿{{ item.startingBalance.toLocaleString() }}</TableCell>
            <TableCell>฿{{ item.payment.toLocaleString() }}</TableCell>
            <TableCell>฿{{ item.principal.toLocaleString() }}</TableCell>
            <TableCell>฿{{ item.interest.toLocaleString() }}</TableCell>
            <TableCell>฿{{ item.endingBalance.toLocaleString() }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <Pagination v-slot="{ page }" :total="totalItems" :items-per-page="itemsPerPage" :default-page="1" @update:page="(val) => (currentPage = val)">
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious :disabled="currentPage === 1" />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page" @click="currentPage = item.value">
            {{ item.value }}
          </PaginationItem>
        </template>

        <PaginationEllipsis v-if="currentPage < totalPages - 2" />

        <PaginationNext :disabled="currentPage === totalPages" />
      </PaginationContent>
    </Pagination>
  </div>
  <div class="flex justify-end gap-2 pt-4">
    <Button @click="exportToPDF">ส่งออก PDF</Button>
    <button @click="exportToExcel" class="px-4 py-2 text-sm rounded-md bg-blue-500 text-white">ส่งออก Excel</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, TableCaption } from "@/components/ui/table";
import { Pagination, PaginationNext, PaginationContent, PaginationPrevious, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

const props = defineProps<{
  schedule: {
    month: number;
    paymentDate: string;
    startingBalance: number;
    payment: number;
    principal: number;
    interest: number;
    endingBalance: number;
  }[];
}>();

const itemsPerPage = 10;
const currentPage = ref(1);

const totalItems = computed(() => props.schedule?.length || 0);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const paginatedData = computed(() => {
  const schedule = props.schedule ?? [];
  const start = (currentPage.value - 1) * itemsPerPage;
  return schedule.slice(start, start + itemsPerPage);
});

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = Math.max(1, newTotal);
  }
});

const exportToPDF = () => {
  // const doc = new jsPDF();
  // doc.text("Loan Amortization Schedule", 10, 10);
  // autoTable(doc, {
  //   startY: 20,
  //   head: [["No.", "Payment Date", "Beginning Balance", "Payment", "Principal", "Interest", "Ending Balance"]],
  //   body: props.schedule.map((item) => [
  //     item.month,
  //     item.paymentDate,
  //     item.startingBalance.toLocaleString(),
  //     item.payment.toLocaleString(),
  //     item.principal.toLocaleString(),
  //     item.interest.toLocaleString(),
  //     item.endingBalance.toLocaleString(),
  //   ]),
  //   styles: { fontSize: 10 },
  // });
  // doc.save("Loan-Amortization-Schedule.pdf");
};

async function exportToExcel() {
  const XLSX = await import("xlsx");

  const worksheet = XLSX.utils.json_to_sheet(
    props.schedule.map((item) => ({
      งวดที่: item.month,
      วันที่ชำระ: item.paymentDate,
      เงินต้นต้นงวด: item.startingBalance,
      ยอดผ่อน: item.payment,
      เงินต้น: item.principal,
      ดอกเบี้ย: item.interest,
      เงินต้นปลายงวด: item.endingBalance,
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "ตารางผ่อนชำระ");
  XLSX.writeFile(workbook, "ตารางผ่อนชำระ.xlsx");
}
</script>
