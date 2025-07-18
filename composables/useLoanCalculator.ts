import { computed, reactive, watch } from 'vue'

export function useLoanCalculator(
    form: {
        amount: number
        interestRate: number
        termYears: number
        termMonths: number
        startDate?: string
    },
    formId: number
) {
    const result = reactive({
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
    })

    const amortizationSchedule = reactive<
        {
            month: number
            paymentDate: string
            startingBalance: number
            payment: number
            principal: number
            interest: number
            endingBalance: number
        }[]
    >([])

    const interestPerYear = reactive<Record<number, number>>({})

    const totalMonths = computed(() => form.termYears * 12 + form.termMonths)
    const monthlyInterestRate = computed(() => form.interestRate / 100 / 12)

    const calculate = () => {
        const P = form.amount
        const r = monthlyInterestRate.value
        const n = totalMonths.value

        amortizationSchedule.length = 0
        Object.keys(interestPerYear).forEach((key) => delete interestPerYear[+key])

        if (P <= 0 || r <= 0 || n <= 0) {
            result.monthlyPayment = 0
            result.totalInterest = 0
            result.totalPayment = 0
            return
        }

        const payment = (P * r) / (1 - Math.pow(1 + r, -n))
        result.monthlyPayment = payment
        result.totalPayment = payment * n
        result.totalInterest = result.totalPayment - P

        let balance = P
        const startDate = form.startDate ? new Date(form.startDate) : new Date()

        for (let i = 1; i <= n; i++) {
            const interest = balance * r
            const principal = payment - interest
            const endingBalance = balance - principal

            const date = new Date(startDate)
            date.setMonth(date.getMonth() + i - 1)

            const paymentDate = date.toISOString().split('T')[0]
            const year = date.getFullYear()
            interestPerYear[year] = (interestPerYear[year] || 0) + interest

            amortizationSchedule.push({
                month: i,
                paymentDate,
                startingBalance: balance,
                payment,
                principal,
                interest,
                endingBalance,
            })

            balance = endingBalance
        }
    }

    // คำนวณใหม่ทุกครั้งที่ form เปลี่ยน
    watch(
        () => [form.amount, form.interestRate, form.termYears, form.termMonths, form.startDate],
        () => {
            calculate()
        },
        { immediate: true }
    )

    const pieChartData = computed(() => ({
        labels: ['เงินต้น', 'ดอกเบี้ย'],
        datasets: [
            {
                data: [form.amount, result.totalInterest],
                backgroundColor: ['#34d399', '#f87171'],
            },
        ],
    }))

    const lineChartData = computed(() => ({
        labels: amortizationSchedule.map((a) => a.paymentDate),
        datasets: [
            {
                label: 'ยอดหนี้คงเหลือ',
                data: amortizationSchedule.map((a) => a.endingBalance),
                borderColor: '#60a5fa',
                tension: 0.3,
            },
        ],
    }))

    const barChartData = computed(() => {
        const years = Object.keys(interestPerYear).sort((a, b) => Number(a) - Number(b))
        return {
            labels: years.map((y) => `ปี ${y}`),
            datasets: [
                {
                    label: 'ดอกเบี้ยรวม (บาท)',
                    data: years.map((y) => interestPerYear[+y]),
                    backgroundColor: '#fb923c',
                },
            ],
        }
    })

    return {
        result,
        amortizationSchedule,
        pieChartData,
        lineChartData,
        barChartData,
        interestPerYear,
        calculate,
        totalMonths,
    }
}
