import {
  zodResolver,
} from '@hookform/resolvers/zod';

import {
  useEffect,
  useState,
} from 'react';

import {
  useFieldArray,
  useForm,
} from 'react-hook-form';

import {
  agencySchema,
  agencyStepFields,
} from '../schemas/agencySchema';

import {
  mapAgencyToForm,
  mapFormToAgency,
} from '../utils/agencyFormMapper';

export const agencyWizardSteps = [
  {
    id: 'company',
    label: 'Empresa',
  },
  {
    id: 'responsible',
    label: 'Responsável',
  },
  {
    id: 'address',
    label: 'Endereço',
  },
  {
    id: 'bank',
    label: 'Banco',
  },
  {
    id: 'managers',
    label: 'Gestores',
  },
  {
    id: 'documents',
    label: 'Documentos',
  },
  {
    id: 'review',
    label: 'Revisão',
  },
];

export function useAgencyForm({
  agency,
  open,
  onCreate,
  onUpdate,
  onSuccess,
}) {
  const [currentStep, setCurrentStep] =
    useState(0);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const form = useForm({
    resolver: zodResolver(agencySchema),
    mode: 'onBlur',
    defaultValues:
      mapAgencyToForm(agency),
  });

  const managersArray = useFieldArray({
    control: form.control,
    name: 'managers',
  });

  const documentsArray = useFieldArray({
    control: form.control,
    name: 'documents',
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset(mapAgencyToForm(agency));
    setCurrentStep(0);
  }, [agency, open, form]);

  const currentStepData =
    agencyWizardSteps[currentStep];

  const isFirstStep =
    currentStep === 0;

  const isLastStep =
    currentStep ===
    agencyWizardSteps.length - 1;

  async function nextStep() {
    const fields =
      agencyStepFields[
        currentStepData.id
      ] ?? [];

    const valid =
      fields.length === 0
        ? true
        : await form.trigger(fields, {
            shouldFocus: true,
          });

    if (!valid) {
      return;
    }

    setCurrentStep((current) =>
      Math.min(
        current + 1,
        agencyWizardSteps.length -
          1,
      ),
    );
  }

  function previousStep() {
    setCurrentStep((current) =>
      Math.max(current - 1, 0),
    );
  }

  async function goToStep(index) {
    if (index <= currentStep) {
      setCurrentStep(index);
      return;
    }

    const fields =
      agencyStepFields[
        currentStepData.id
      ] ?? [];

    const valid =
      fields.length === 0
        ? true
        : await form.trigger(fields);

    if (valid) {
      setCurrentStep(index);
    }
  }

  const submit = form.handleSubmit(
    async (formData) => {
      try {
        setIsSubmitting(true);

        const payload =
          mapFormToAgency(
            formData,
            agency,
          );

        const result = agency
          ? await onUpdate(
              agency.id,
              payload,
            )
          : await onCreate(payload);

        onSuccess?.(result);
      } finally {
        setIsSubmitting(false);
      }
    },
  );

  return {
    form,
    managersArray,
    documentsArray,

    steps: agencyWizardSteps,
    currentStep,
    currentStepData,

    isFirstStep,
    isLastStep,
    isSubmitting,

    nextStep,
    previousStep,
    goToStep,
    submit,
  };
}
