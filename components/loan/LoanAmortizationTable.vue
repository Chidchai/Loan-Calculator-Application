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
      <Button @click="exportToPDF">ส่งออก PDF</Button>
      <button @click="exportToExcel" class="px-4 py-2 text-sm rounded-md bg-blue-500 text-white">ส่งออก Excel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { Button } from "@/components/ui/button";

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

function format(value: number): string {
  return value.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// async function exportToPDF() {
//   const { jsPDF } = await import("jspdf");
//   const autoTable = (await import("jspdf-autotable")).default;
//   const { registerThaiFont } = await import("@/utils/font-thsarabun-base64");

//   const doc = new jsPDF({
//     unit: "pt",
//     format: "a4",
//     orientation: "portrait",
//   });

//   registerThaiFont(doc);
//   doc.setFont("THSarabunNew");
//   doc.setFontSize(16);
//   doc.text("ตารางแสดงรายละเอียดการผ่อนชำระ", 40, 40);

//   autoTable(doc, {
//     startY: 60,
//     head: [["งวดที่", "วันที่ชำระ", "ยอดเงินต้นคงเหลือต้นงวด", "ยอดผ่อนต่อเดือน", "เงินต้น", "ดอกเบี้ย", "ยอดเงินต้นคงเหลือปลายงวด"]],
//     body: props.schedule.map((item) => [item.month, item.paymentDate, `฿ ${format(item.startingBalance)}`, `฿ ${format(item.payment)}`, `฿ ${format(item.principal)}`, `฿ ${format(item.interest)}`, `฿ ${format(item.endingBalance)}`]),
//     styles: {
//       font: "THSarabunNew",
//       fontSize: 12,
//     },
//     headStyles: {
//       font: "THSarabunNew",
//       fontStyle: "bold",
//       fillColor: [41, 128, 185],
//       textColor: 255,
//     },
//     didDrawPage: (data) => {
//       // กำหนด Header เอง
//       doc.setFont("THSarabunNew");
//       doc.setFontSize(16);
//       doc.text("รายงานตารางผ่อนชำระ", data.settings.margin.left, 40);

//       // ใส่เลขหน้า
//       const pageSize = doc.internal.pageSize;
//       const pageHeight = pageSize.height || pageSize.getHeight();
//       doc.setFontSize(10);
//     },
//   });

//   doc.save("ตารางผ่อนชำระ.pdf");
// }

function exportToPDF() {
  window.open("/api/export-pdf", "_blank");
}
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
