<template>
  <div class="mt-10 space-y-4">
    <h3 class="text-lg font-semibold">ตารางแสดงรายละเอียดการผ่อนชำระ (Amortization Schedule)</h3>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-left border rounded-md">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="p-2">งวดที่</th>
            <th class="p-2">วันที่ชำระ</th>
            <th class="p-2">ยอดเงินต้นคงเหลือต้นงวด</th>
            <th class="p-2">ยอดผ่อนต่อเดือน</th>
            <th class="p-2">เงินต้น</th>
            <th class="p-2">ดอกเบี้ย</th>
            <th class="p-2">ยอดเงินต้นคงเหลือปลายงวด</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in schedule" :key="index" class="border-t">
            <td class="p-2">{{ item.month }}</td>
            <td class="p-2">{{ item.paymentDate }}</td>
            <td class="p-2">฿ {{ format(item.startingBalance) }}</td>
            <td class="p-2">฿ {{ format(item.payment) }}</td>
            <td class="p-2">฿ {{ format(item.principal) }}</td>
            <td class="p-2">฿ {{ format(item.interest) }}</td>
            <td class="p-2">฿ {{ format(item.endingBalance) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end gap-2 pt-4">
      <button @click="exportToPDF" class="px-4 py-2 text-sm rounded-md bg-black text-white">ส่งออก PDF</button>
      <button @click="exportToExcel" class="px-4 py-2 text-sm rounded-md bg-blue-500 text-white">ส่งออก Excel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";

// รับข้อมูลผ่าน props
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

// ฟอร์แมตเลขเป็นทศนิยม 2 ตำแหน่ง + คั่นหลักพัน
function format(value: number): string {
  return value.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ส่งออก PDF
function exportToPDF() {
  //   const doc = new jsPDF();
  //   doc.setFont("THSarabunNew"); // ถ้ามี font ไทยแบบ embed
  //   doc.text("ตารางผ่อนชำระเงินกู้", 14, 16);
  //   autoTable(doc, {
  //     startY: 20,
  //     head: [["งวดที่", "วันที่ชำระ", "เงินต้นต้นงวด", "ยอดผ่อน", "เงินต้น", "ดอกเบี้ย", "เงินต้นปลายงวด"]],
  //     body: props.schedule.map((item) => [
  //       item.month,
  //       item.paymentDate,
  //       `฿ ${format(item.startingBalance)}`,
  //       `฿ ${format(item.payment)}`,
  //       `฿ ${format(item.principal)}`,
  //       `฿ ${format(item.interest)}`,
  //       `฿ ${format(item.endingBalance)}`,
  //     ]),
  //   });
  //   doc.save("ตารางผ่อนชำระ.pdf");
}

// ส่งออก Excel
function exportToExcel() {
  //   const worksheet = XLSX.utils.json_to_sheet(props.schedule);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "ตารางผ่อนชำระ");
  //   XLSX.writeFile(workbook, "ตารางผ่อนชำระ.xlsx");
}
</script>
