import { ref } from 'vue'
import type { LoanForm, FormEntry } from '~/types/loan'

export const useLoanStore = defineStore('loan', () => {
    const forms = ref<FormEntry[]>([
        {
            id: 1,
            form: {
                amount: 0,
                interestRate: 0,
                termYears: 0,
                termMonths: 0,
                startDate: '',
            },
        },
    ])

    function addForm(form: LoanForm, id: number) {
        forms.value.push({ id, form })
    }

    function removeForm(id: number) {
        forms.value = forms.value.filter((f) => f.id !== id)
    }

    return {
        forms,
        addForm,
        removeForm,
    }
}, {
    persist: true,
})
