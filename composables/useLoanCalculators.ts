import type { FormEntry } from "~/types/loan";

// composables/useLoanCalculators.ts
export function useLoanCalculators(forms: Ref<FormEntry[]>) {
    const calculators = reactive<Record<number, ReturnType<typeof useLoanCalculator>>>({});

    watchEffect(() => {
        for (const { id, form } of forms.value) {
            if (!calculators[id]) {
                calculators[id] = useLoanCalculator(form, id);
            }
        }
    });

    return { calculators };
}
