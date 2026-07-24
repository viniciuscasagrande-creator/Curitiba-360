import WizardProgress from './WizardProgress';
import WizardNavigation from './WizardNavigation';
import AgencyStepCompany from './AgencyStepCompany';
import AgencyStepResponsible from './AgencyStepResponsible';
import AgencyStepAddress from './AgencyStepAddress';
import AgencyStepBank from './AgencyStepBank';
import AgencyStepManagers from './AgencyStepManagers';
import AgencyStepDocuments from './AgencyStepDocuments';
import AgencyStepReview from './AgencyStepReview';
import { useAgencyForm } from '../hooks/useAgencyForm';

export default function AgencyWizard({ agency, isSubmitting, onSave, onCancel }) {
  const {
    step,
    setStep,
    formData,
    errors,
    isSearchingCep,
    updateField,
    searchCep,
    nextStep,
    previousStep,
  } = useAgencyForm(agency);

  function handleSubmit() {
    onSave(formData);
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <WizardProgress currentStep={step} onSelectStep={(s) => setStep(s)} />

      <div className="flex-1 overflow-y-auto p-6">
        {step === 1 && (
          <AgencyStepCompany formData={formData} errors={errors} onChange={updateField} />
        )}
        {step === 2 && (
          <AgencyStepResponsible formData={formData} errors={errors} onChange={updateField} />
        )}
        {step === 3 && (
          <AgencyStepAddress
            formData={formData}
            errors={errors}
            isSearchingCep={isSearchingCep}
            onChange={updateField}
            onSearchCep={searchCep}
          />
        )}
        {step === 4 && (
          <AgencyStepBank formData={formData} onChange={updateField} />
        )}
        {step === 5 && (
          <AgencyStepManagers formData={formData} onChange={updateField} />
        )}
        {step === 6 && (
          <AgencyStepDocuments formData={formData} onChange={updateField} />
        )}
        {step === 7 && (
          <AgencyStepReview formData={formData} />
        )}
      </div>

      <WizardNavigation
        currentStep={step}
        totalSteps={7}
        isSubmitting={isSubmitting}
        onPrevious={previousStep}
        onNext={nextStep}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
}
