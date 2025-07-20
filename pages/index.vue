<template>
  <section class="w-full py-16">
    <div class="max-w-6xl mx-auto px-4 text-center space-y-10">
      <div>
        <h1 class="text-4xl font-bold tracking-tight">เปรียบเทียบสินเชื่อได้ง่ายๆ ในไม่กี่คลิก</h1>
        <p class="text-gray-500 mt-4 max-w-xl mx-auto">ระบบช่วยคำนวณและเปรียบเทียบสินเชื่ออย่างละเอียด พร้อมตารางและกราฟแบบมืออาชีพ</p>
        <div class="mt-6 space-x-4">
          <NuxtLink to="/calculator">
            <Button>เริ่มคำนวณ</Button>
          </NuxtLink>
          <NuxtLink to="/comparison" variant="outline">
            <Button variant="outline">เปรียบเทียบสินเชื่อ</Button>
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle>คำนวณสินเชื่อทันที</CardTitle>
            <CardDescription> ป้อนข้อมูลไม่กี่ขั้นตอน รู้ผลทันทีแบบละเอียด </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>เปรียบเทียบหลายรายการ</CardTitle>
            <CardDescription> เลือกสินเชื่อหลายแบบ เปรียบเทียบ side-by-side </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>แสดงผลกราฟสวยงาม</CardTitle>
            <CardDescription> รองรับ Pie / Line / Bar Charts เพื่อวิเคราะห์ง่ายขึ้น </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
</script>
