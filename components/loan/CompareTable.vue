<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type LoanFieldKey = "interestRate" | "term" | "monthlyPayment" | "totalInterest" | "type" | "highlight";

interface Loan {
  name: string;
  interestRate: string;
  term: string;
  monthlyPayment: string;
  totalInterest: string;
  type: string;
  highlight: string;
}
const props = defineProps<{
  loans: Loan[];
}>();

const fields: { label: string; key: LoanFieldKey }[] = [
  { label: "Interest Rate", key: "interestRate" },
  { label: "Loan Term", key: "term" },
  { label: "Monthly Payment", key: "monthlyPayment" },
  { label: "Total Interest Paid", key: "totalInterest" },
  { label: "Loan Type", key: "type" },
  { label: "Highlights", key: "highlight" },
];
</script>

<template>
  <Card>
    <CardContent class="p-6">
      <h2 class="text-2xl font-bold mb-1">Compare Loans</h2>
      <p class="text-muted-foreground mb-6">Compare your loan options side-by-side to find the best fit.</p>

      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan Details</TableHead>
              <TableHead v-for="loan in loans" :key="loan.name">{{ loan.name }}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-for="field in fields" :key="field.key">
              <TableCell class="font-medium">{{ field.label }}</TableCell>
              <TableCell v-for="loan in loans" :key="loan.name">
                <span :class="field.key === 'highlight' ? 'text-green-600' : ''">
                  {{ loan[field.key] }}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</template>
