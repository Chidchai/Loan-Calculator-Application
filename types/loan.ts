export type LoanForm = {
    amount: number;
    interestRate: number;
    termYears: number;
    termMonths: number;
    startDate?: string;
};

export type FormEntry = {
    id: number;
    form: LoanForm;
};

export type PieChartData = {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
    }[];
};

export type LineChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        tension: number;
    }[];
};

export type BarChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
};

export type AmortizationSchedule = {
    month: number;
    paymentDate: string;
    startingBalance: number;
    payment: number;
    principal: number;
    interest: number;
    endingBalance: number;
}

export type Summary = {
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    pieChartData: PieChartData;
    lineChartData: LineChartData;
    barChartData: BarChartData;
    amortizationSchedule: AmortizationSchedule[]
};

