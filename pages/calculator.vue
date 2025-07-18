<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import LoanForm from "@/components/loan/LoanForm.vue";
import DataVisualization from "@/components/loan/DataVisualization.vue";
import LoanSummary from "@/components/loan/LoanSummary.vue";
import LoanAmortizationTable from "@/components/loan/LoanAmortizationTable.vue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { Summary } from "@/types/loan";

// ฟอร์มสินเชื่อ
const forms = ref([
  {
    id: 1,
    form: reactive({
      amount: 0,
      interestRate: 0,
      termYears: 0,
      termMonths: 0,
      startDate: "",
    }),
  },
]);

// เก็บ calculator ที่เกี่ยวข้องกับแต่ละฟอร์ม
const calculators = reactive<Record<number, ReturnType<typeof useLoanCalculator>>>({});

// เก็บ summary แต่ละฟอร์ม
const summaries = reactive<Record<number, Summary>>({});

// Active tab
const activeTab = ref("form-1");
const activeFormId = computed(() => {
  const id = parseInt(activeTab.value.replace("form-", ""));
  return isNaN(id) ? 1 : id;
});

// สร้าง calculator เบื้องต้น
forms.value.forEach((f) => {
  calculators[f.id] = useLoanCalculator(f.form, f.id);
});

// เพิ่มฟอร์มใหม่
function addForm() {
  const nextId = forms.value.length ? Math.max(...forms.value.map((f) => f.id)) + 1 : 1;
  const newForm = {
    id: nextId,
    form: reactive({
      amount: 0,
      interestRate: 0,
      termYears: 0,
      termMonths: 0,
      startDate: "",
    }),
  };
  forms.value.push(newForm);
  calculators[nextId] = useLoanCalculator(newForm.form, newForm.id);
  activeTab.value = `form-${nextId}`;
}

// ลบฟอร์ม
function removeForm(id: number) {
  const index = forms.value.findIndex((f) => f.id === id);
  if (index !== -1) {
    forms.value.splice(index, 1);
    delete calculators[id];
    delete summaries[id];

    // อัปเดต localStorage loan-forms
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("loan-forms");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as { id: number; form: any }[];
          const updated = parsed.filter((f) => f.id !== id);

          if (updated.length > 0) {
            localStorage.setItem("loan-forms", JSON.stringify(updated));
          } else {
            localStorage.removeItem("loan-forms"); // ถ้าไม่มีเหลือ ให้ลบทิ้งเลย
          }
        } catch (e) {
          console.error("Failed to update localStorage on form remove", e);
        }
      }
    }

    // ถ้า tab ที่ลบเป็น active tab → ย้ายไป tab แรก
    if (activeFormId.value === id) {
      const newActive = forms.value[0]?.id;
      if (newActive) {
        activeTab.value = `form-${newActive}`;
      } else {
        // ถ้าไม่มี form เหลือ สร้างใหม่
        addForm();
      }
    }
  }
}

// รับผลการคำนวณจาก LoanForm
function updateSummary(id: number, summary: Summary) {
  summaries[id] = summary;
}

onMounted(() => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("loan-forms");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        forms.value = parsed.map((f: any) => ({
          id: f.id,
          form: reactive(f.form),
        }));
        // สร้าง calculator สำหรับทุกฟอร์ม
        for (const f of forms.value) {
          calculators[f.id] = useLoanCalculator(f.form, f.id);
        }
        activeTab.value = `form-${forms.value[0].id}`;
      }
    }
  }
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Loan Comparisons</h2>
      <Button @click="addForm">+ เพิ่มสินเชื่อ</Button>
    </div>

    <Tabs v-model="activeTab" class="w-full">
      <!-- Tabs header -->
      <TabsList>
        <TabsTrigger v-for="form in forms" :key="form.id" :value="`form-${form.id}`" class="flex items-center gap-2">
          สินเชื่อ {{ form.id }}
          <button v-if="forms.length > 1" @click.stop="removeForm(form.id)" class="text-red-500 hover:text-red-700 text-xs">✕</button>
        </TabsTrigger>
      </TabsList>

      <!-- Tabs content -->
      <TabsContent v-for="form in forms" :key="form.id" :value="`form-${form.id}`" class="pt-4">
        <LoanForm :form="form.form" :formName="`สินเชื่อ ${form.id}`" :formId="form.id" @update:summary="(value) => updateSummary(form.id, value)" />
      </TabsContent>
    </Tabs>

    <NuxtLink to="/comparison" variant="outline">
      <Button variant="default">เปรียบเทียบสินเชื่อ</Button>
    </NuxtLink>
    <!-- Summary & Charts -->
    <LoanSummary
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

    <LoanAmortizationTable :schedule="summaries[activeFormId]?.amortizationSchedule || []" />
  </div>
</template>
