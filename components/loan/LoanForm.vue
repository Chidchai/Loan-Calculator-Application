<template>
  <form @submit.prevent="submitForm" class="space-y-6 max-w-md">
    <div>
      <h2 class="text-2xl font-semibold">{{ props.formName }}</h2>
    </div>

    <!-- Loan Amount -->
    <div class="space-y-1">
      <Label for="amount">ยอดเงินกู้</Label>
      <Input id="amount" type="number" v-model.number="form.amount" min="100000" max="10000000" placeholder="100,000 - 10,000,000" />
    </div>

    <!-- Interest Rate -->
    <div class="space-y-1">
      <Label for="interestRate">อัตราดอกเบี้ยต่อปี (1-20%)</Label>
      <Input id="interestRate" type="number" v-model.number="form.interestRate" min="1" max="20" step="0.01" placeholder="1 - 20" />
    </div>

    <!-- Loan Term -->
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-1">
        <Label for="termYears">ระยะเวลากู้ (ปี)</Label>
        <Input id="termYears" type="number" v-model.number="form.termYears" min="0" max="30" />
      </div>
      <div class="space-y-1">
        <Label for="termMonths">ระยะเวลากู้ (เดือน)</Label>
        <Input id="termMonths" type="number" v-model.number="form.termMonths" min="0" max="11" />
      </div>
    </div>

    <!-- Start Date -->
    <div class="space-y-1">
      <Label for="startDate">วันที่เริ่มต้นสัญญา</Label>
      <Input id="startDate" type="date" v-model="form.startDate" />
    </div>

    <!-- Submit -->
    <!-- <div class="pt-4">
      <Button type="submit">Calculate</Button>
    </div> -->
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
const props = defineProps<{
  formName?: string;
}>();
const form = reactive({
  amount: 100000,
  interestRate: 5,
  termYears: 10,
  termMonths: 0,
  startDate: "",
});

function submitForm() {
  console.log("Form Submitted:", form);
  // emit หรือเรียกฟังก์ชันคำนวณต่อได้
}
</script>
