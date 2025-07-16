<script setup lang="ts">
import CompareTable from "~/components/loan/CompareTable.vue";

const loanList = [
  {
    name: "Loan A",
    interestRate: "5.5%",
    term: "30 years",
    monthlyPayment: "$1,500",
    totalInterest: "$200,000",
    type: "Fixed",
    highlight: "Lower interest rate",
  },
  {
    name: "Loan B",
    interestRate: "6.0%",
    term: "20 years",
    monthlyPayment: "$2,000",
    totalInterest: "$150,000",
    type: "Adjustable",
    highlight: "Shorter term, lower total interest",
  },
  {
    name: "Loan C",
    interestRate: "4.8%",
    term: "25 years",
    monthlyPayment: "$1,700",
    totalInterest: "$180,000",
    type: "Fixed",
    highlight: "Lowest monthly payment",
  },
];
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <CompareTable :loans="loanList" />
  </div>
</template>
