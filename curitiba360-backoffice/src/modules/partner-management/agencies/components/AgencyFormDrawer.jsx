import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  FileText,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  UserRound,
  X,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import {
  useWatch,
} from 'react-hook-form';

import {
  FormField,
  inputClassName,
  maskCep,
  maskCnpj,
  maskCpf,
  maskPhone,
} from './AgencyFormFields';

import AgencyWizardProgress from './AgencyWizardProgress';

import {
  useAgencyForm,
} from '../hooks/useAgencyForm';

export default function AgencyFormDrawer({
  open,
  agency,
  onClose,
  onCreate,
  onUpdate,
  onSuccess,
}) {
  const wizard = useAgencyForm({
    agency,
    open,
    onCreate,
    onUpdate,
    onSuccess: (result) => {
      onSuccess?.(result);
      onClose();
    },
  });

  const {
    form,
    managersArray,
    documentsArray,
    steps,
    currentStep,
    currentStepData,
    isFirstStep,
    isLastStep,
    isSubmitting,
    nextStep,
    previousStep,
    goToStep,
    submit,
  } = wizard;

  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    function handleEscape(event) {
      if (
        event.key === 'Escape' &&
        !isSubmitting
      ) {
        onClose();
      }
    }

    document.addEventListener(
      'keydown',
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, [open, isSubmitting, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110]">
      <button
        type="button"
        aria-label="Fechar formulário"
        onClick={
          isSubmitting
            ? undefined
            : onClose
        }
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[960px] flex-col bg-slate-50 shadow-2xl text-left">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Building2 size={20} />
            </span>

            <div>
              <h2 className="text-xl font-black text-slate-950">
                {agency
                  ? 'Editar agência'
                  : 'Cadastrar agência'}
              </h2>

              <p className="mt-1 text-xs font-medium text-slate-500">
                {agency
                  ? `Atualizando ${agency.tradeName}.`
                  : 'Preencha os dados para criar uma nova agência.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:opacity-40"
          >
            <X size={18} />
          </button>
        </header>

        <AgencyWizardProgress
          steps={steps}
          currentStep={currentStep}
          onStepChange={goToStep}
        />

        <form
          onSubmit={submit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 overflow-y-auto p-5 sm:p-7">
            <div className="mx-auto max-w-4xl">
              <StepHeading
                step={
                  currentStepData.id
                }
              />

              {currentStepData.id ===
                'company' && (
                <CompanyStep
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />
              )}

              {currentStepData.id ===
                'responsible' && (
                <ResponsibleStep
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />
              )}

              {currentStepData.id ===
                'address' && (
                <AddressStep
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  errors={errors}
                />
              )}

              {currentStepData.id ===
                'bank' && (
                <BankStep
                  register={register}
                  errors={errors}
                />
              )}

              {currentStepData.id ===
                'managers' && (
                <ManagersStep
                  register={register}
                  errors={errors}
                  fields={
                    managersArray.fields
                  }
                  append={
                    managersArray.append
                  }
                  remove={
                    managersArray.remove
                  }
                  setValue={setValue}
                />
              )}

              {currentStepData.id ===
                'documents' && (
                <DocumentsStep
                  register={register}
                  fields={
                    documentsArray.fields
                  }
                  append={
                    documentsArray.append
                  }
                  remove={
                    documentsArray.remove
                  }
                  setValue={setValue}
                />
              )}

              {currentStepData.id ===
                'review' && (
                <ReviewStep
                  control={control}
                />
              )}
            </div>
          </div>

          <footer className="flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-5 py-4 sm:px-7">
            <button
              type="button"
              disabled={
                isFirstStep ||
                isSubmitting
              }
              onClick={previousStep}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-xs font-black text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={15} />
              Voltar
            </button>

            <div className="text-center">
              <strong className="block text-xs font-black text-slate-700">
                Etapa {currentStep + 1}{' '}
                de {steps.length}
              </strong>

              <span className="text-[10px] font-bold text-slate-400">
                {currentStepData.label}
              </span>
            </div>

            {isLastStep ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-xs font-black text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={16} />
                )}

                {isSubmitting
                  ? 'Salvando...'
                  : 'Salvar Agência'}
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={nextStep}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-xs font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
              >
                Continuar
                <ArrowRight size={15} />
              </button>
            )}
          </footer>
        </form>
      </aside>
    </div>
  );
}

function StepHeading({ step }) {
  const content = {
    company: {
      title: 'Dados da empresa',
      description:
        'Informe os dados cadastrais e comerciais da agência.',
    },
    responsible: {
      title: 'Responsável pela agência',
      description:
        'Cadastre a pessoa responsável pela operação.',
    },
    address: {
      title: 'Endereço',
      description:
        'Informe a localização cadastral da empresa.',
    },
    bank: {
      title: 'Dados bancários',
      description:
        'Configure a conta utilizada para pagamentos e repasses.',
    },
    managers: {
      title: 'Gestores da conta',
      description:
        'Adicione usuários responsáveis pela administração.',
    },
    documents: {
      title: 'Documentos',
      description:
        'Anexe contratos e comprovantes relacionados à agência.',
    },
    review: {
      title: 'Revisão do cadastro',
      description:
        'Confira os dados antes de salvar a agência.',
    },
  }[step];

  return (
    <div className="mb-6 text-left">
      <h3 className="text-2xl font-black tracking-tight text-slate-950">
        {content.title}
      </h3>

      <p className="mt-2 text-sm font-medium text-slate-500">
        {content.description}
      </p>
    </div>
  );
}

function CompanyStep({
  register,
  setValue,
  errors,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 text-left">
      <FormField
        label="Nome fantasia"
        required
        error={errors.tradeName}
      >
        <input
          {...register('tradeName')}
          className={inputClassName}
          placeholder="Ex.: Turismo Curitiba"
        />
      </FormField>

      <FormField
        label="Razão social"
        required
        error={errors.corporateName}
      >
        <input
          {...register(
            'corporateName',
          )}
          className={inputClassName}
          placeholder="Razão social completa"
        />
      </FormField>

      <FormField
        label="CNPJ"
        required
        error={errors.cnpj}
      >
        <input
          {...register('cnpj')}
          onChange={(event) =>
            setValue(
              'cnpj',
              maskCnpj(
                event.target.value,
              ),
              {
                shouldValidate: true,
              },
            )
          }
          className={inputClassName}
          placeholder="00.000.000/0000-00"
        />
      </FormField>

      <FormField
        label="Inscrição estadual"
        error={
          errors.stateRegistration
        }
      >
        <input
          {...register(
            'stateRegistration',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Tipo da empresa"
        required
        error={errors.companyType}
      >
        <select
          {...register('companyType')}
          className={inputClassName}
        >
          <option value="">
            Selecione
          </option>
          <option value="Agência de Turismo">
            Agência de Turismo
          </option>
          <option value="Operadora">
            Operadora
          </option>
          <option value="Hotel">
            Hotel
          </option>
          <option value="Receptivo">
            Receptivo
          </option>
          <option value="Outro">
            Outro
          </option>
        </select>
      </FormField>

      <FormField
        label="Telefone comercial"
        error={
          errors.commercialPhone
        }
      >
        <input
          {...register(
            'commercialPhone',
          )}
          onChange={(event) =>
            setValue(
              'commercialPhone',
              maskPhone(
                event.target.value,
              ),
            )
          }
          className={inputClassName}
          placeholder="(41) 0000-0000"
        />
      </FormField>

      <FormField
        label="Site"
        error={errors.site}
        className="sm:col-span-2"
      >
        <input
          {...register('site')}
          className={inputClassName}
          placeholder="https://www.exemplo.com.br"
        />
      </FormField>
    </div>
  );
}

function ResponsibleStep({
  register,
  setValue,
  errors,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 text-left">
      <FormField
        label="Nome completo"
        required
        error={
          errors.responsibleName
        }
        className="sm:col-span-2"
      >
        <input
          {...register(
            'responsibleName',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="CPF"
        required
        error={
          errors.responsibleCpf
        }
      >
        <input
          {...register(
            'responsibleCpf',
          )}
          onChange={(event) =>
            setValue(
              'responsibleCpf',
              maskCpf(
                event.target.value,
              ),
              {
                shouldValidate: true,
              },
            )
          }
          className={inputClassName}
          placeholder="000.000.000-00"
        />
      </FormField>

      <FormField
        label="RG"
        error={
          errors.responsibleRg
        }
      >
        <input
          {...register(
            'responsibleRg',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField label="Nascimento">
        <input
          type="date"
          {...register(
            'responsibleBirthDate',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField label="Cargo">
        <input
          {...register(
            'responsibleRole',
          )}
          className={inputClassName}
          placeholder="Ex.: Diretor"
        />
      </FormField>

      <FormField
        label="E-mail"
        required
        error={errors.email}
      >
        <input
          type="email"
          {...register('email')}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Telefone"
        required
        error={
          errors.responsiblePhone
        }
      >
        <input
          {...register(
            'responsiblePhone',
          )}
          onChange={(event) =>
            setValue(
              'responsiblePhone',
              maskPhone(
                event.target.value,
              ),
              {
                shouldValidate: true,
              },
            )
          }
          className={inputClassName}
          placeholder="(41) 90000-0000"
        />
      </FormField>
    </div>
  );
}

function AddressStep({
  register,
  setValue,
  getValues,
  errors,
}) {
  const [loadingCep, setLoadingCep] =
    useState(false);

  async function searchCep() {
    const cep = getValues('zipCode')
      .replace(/\D/g, '');

    if (cep.length !== 8) {
      return;
    }

    try {
      setLoadingCep(true);

      const response = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`,
      );

      if (!response.ok) {
        throw new Error(
          'Não foi possível consultar o CEP.',
        );
      }

      const data =
        await response.json();

      if (data.erro) {
        return;
      }

      setValue(
        'street',
        data.logradouro ?? '',
        {
          shouldValidate: true,
        },
      );

      setValue(
        'district',
        data.bairro ?? '',
        {
          shouldValidate: true,
        },
      );

      setValue(
        'city',
        data.localidade ?? '',
        {
          shouldValidate: true,
        },
      );

      setValue(
        'state',
        data.uf ?? '',
        {
          shouldValidate: true,
        },
      );
    } finally {
      setLoadingCep(false);
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 text-left">
      <FormField
        label="CEP"
        required
        error={errors.zipCode}
      >
        <div className="flex gap-2">
          <input
            {...register('zipCode')}
            onChange={(event) =>
              setValue(
                'zipCode',
                maskCep(
                  event.target.value,
                ),
                {
                  shouldValidate: true,
                },
              )
            }
            onBlur={searchCep}
            className={inputClassName}
            placeholder="00000-000"
          />

          <button
            type="button"
            disabled={loadingCep}
            onClick={searchCep}
            className="h-11 shrink-0 rounded-2xl bg-slate-900 px-4 text-xs font-black text-white disabled:opacity-50"
          >
            {loadingCep
              ? 'Buscando'
              : 'Buscar'}
          </button>
        </div>
      </FormField>

      <FormField
        label="País"
        required
        error={errors.country}
      >
        <input
          {...register('country')}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Logradouro"
        required
        error={errors.street}
        className="sm:col-span-2"
      >
        <input
          {...register('street')}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Número"
        required
        error={errors.number}
      >
        <input
          {...register('number')}
          className={inputClassName}
        />
      </FormField>

      <FormField label="Complemento">
        <input
          {...register('complement')}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Bairro"
        required
        error={errors.district}
      >
        <input
          {...register('district')}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Cidade"
        required
        error={errors.city}
      >
        <input
          {...register('city')}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="UF"
        required
        error={errors.state}
      >
        <input
          maxLength={2}
          {...register('state')}
          className={inputClassName}
          onChange={(event) =>
            setValue(
              'state',
              event.target.value
                .toUpperCase()
                .slice(0, 2),
              {
                shouldValidate: true,
              },
            )
          }
        />
      </FormField>
    </div>
  );
}

function BankStep({
  register,
  errors,
}) {
  const bankErrors =
    errors.bankAccount ?? {};

  return (
    <div className="grid gap-4 sm:grid-cols-2 text-left">
      <FormField label="Código do banco">
        <input
          {...register(
            'bankAccount.bankCode',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Banco"
        required
        error={bankErrors.bankName}
      >
        <input
          {...register(
            'bankAccount.bankName',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Agência"
        required
        error={bankErrors.agency}
      >
        <input
          {...register(
            'bankAccount.agency',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Conta"
        required
        error={bankErrors.account}
      >
        <input
          {...register(
            'bankAccount.account',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField label="Operação">
        <input
          {...register(
            'bankAccount.operation',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="Tipo da conta"
        required
        error={
          bankErrors.accountType
        }
      >
        <select
          {...register(
            'bankAccount.accountType',
          )}
          className={inputClassName}
        >
          <option value="">
            Selecione
          </option>
          <option value="Conta Corrente">
            Conta Corrente
          </option>
          <option value="Conta Poupança">
            Conta Poupança
          </option>
          <option value="Conta Pagamento">
            Conta Pagamento
          </option>
        </select>
      </FormField>

      <FormField
        label="Titular"
        required
        error={bankErrors.holder}
      >
        <input
          {...register(
            'bankAccount.holder',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField
        label="CPF/CNPJ do titular"
        required
        error={
          bankErrors.holderDocument
        }
      >
        <input
          {...register(
            'bankAccount.holderDocument',
          )}
          className={inputClassName}
        />
      </FormField>

      <FormField label="Tipo da chave Pix">
        <select
          {...register(
            'bankAccount.pixKeyType',
          )}
          className={inputClassName}
        >
          <option value="">
            Selecione
          </option>
          <option value="CPF">
            CPF
          </option>
          <option value="CNPJ">
            CNPJ
          </option>
          <option value="E-mail">
            E-mail
          </option>
          <option value="Telefone">
            Telefone
          </option>
          <option value="Aleatória">
            Aleatória
          </option>
        </select>
      </FormField>

      <FormField label="Chave Pix">
        <input
          {...register(
            'bankAccount.pixKey',
          )}
          className={inputClassName}
        />
      </FormField>
    </div>
  );
}

function ManagersStep({
  register,
  fields,
  append,
  remove,
  setValue,
  errors,
}) {
  function addManager() {
    append({
      id: crypto.randomUUID(),
      name: '',
      role: '',
      email: '',
      phone: '',
      permission: 'Consulta',
    });
  }

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addManager}
          className="inline-flex h-10 items-center gap-2 rounded-2xl bg-slate-900 px-4 text-xs font-black text-white"
        >
          <Plus size={15} />
          Adicionar gestor
        </button>
      </div>

      {fields.length === 0 ? (
        <EmptyBlock
          icon={UserRound}
          title="Nenhum gestor adicionado"
          description="Esta etapa é opcional."
        />
      ) : (
        fields.map((field, index) => {
          const managerErrors =
            errors.managers?.[index] ??
            {};

          return (
            <article
              key={field.id}
              className="rounded-[22px] border border-slate-200 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <strong className="text-sm font-black text-slate-800">
                  Gestor {index + 1}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    remove(index)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="hidden"
                  {...register(
                    `managers.${index}.id`,
                  )}
                />

                <FormField
                  label="Nome"
                  required
                  error={
                    managerErrors.name
                  }
                >
                  <input
                    {...register(
                      `managers.${index}.name`,
                    )}
                    className={
                      inputClassName
                    }
                  />
                </FormField>

                <FormField label="Cargo">
                  <input
                    {...register(
                      `managers.${index}.role`,
                    )}
                    className={
                      inputClassName
                    }
                  />
                </FormField>

                <FormField
                  label="E-mail"
                  required
                  error={
                    managerErrors.email
                  }
                >
                  <input
                    type="email"
                    {...register(
                      `managers.${index}.email`,
                    )}
                    className={
                      inputClassName
                    }
                  />
                </FormField>

                <FormField label="Telefone">
                  <input
                    {...register(
                      `managers.${index}.phone`,
                    )}
                    onChange={(event) =>
                      setValue(
                        `managers.${index}.phone`,
                        maskPhone(
                          event.target
                            .value,
                        ),
                      )
                    }
                    className={
                      inputClassName
                    }
                  />
                </FormField>

                <FormField
                  label="Permissão"
                  className="sm:col-span-2"
                >
                  <select
                    {...register(
                      `managers.${index}.permission`,
                    )}
                    className={
                      inputClassName
                    }
                  >
                    <option value="Administrador">
                      Administrador
                    </option>
                    <option value="Financeiro">
                      Financeiro
                    </option>
                    <option value="Operacional">
                      Operacional
                    </option>
                    <option value="Consulta">
                      Consulta
                    </option>
                  </select>
                </FormField>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}

function DocumentsStep({
  register,
  fields,
  append,
  remove,
  setValue,
}) {
  function addDocument() {
    append({
      id: crypto.randomUUID(),
      name: '',
      type: 'Outros',
      url: '',
      file: null,
    });
  }

  function handleFile(
    index,
    file,
  ) {
    if (!file) {
      return;
    }

    setValue(
      `documents.${index}.file`,
      file,
    );

    setValue(
      `documents.${index}.name`,
      file.name,
      {
        shouldValidate: true,
      },
    );

    const localUrl =
      URL.createObjectURL(file);

    setValue(
      `documents.${index}.url`,
      localUrl,
    );
  }

  return (
    <div className="space-y-4 text-left">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={addDocument}
          className="inline-flex h-10 items-center gap-2 rounded-2xl bg-slate-900 px-4 text-xs font-black text-white"
        >
          <Plus size={15} />
          Adicionar documento
        </button>
      </div>

      {fields.length === 0 ? (
        <EmptyBlock
          icon={FileText}
          title="Nenhum documento adicionado"
          description="Adicione os documentos necessários para análise."
        />
      ) : (
        fields.map((field, index) => (
          <article
            key={field.id}
            className="rounded-[22px] border border-slate-200 bg-white p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <strong className="text-sm font-black text-slate-800">
                Documento {index + 1}
              </strong>

              <button
                type="button"
                onClick={() =>
                  remove(index)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="hidden"
                {...register(
                  `documents.${index}.id`,
                )}
              />

              <FormField label="Tipo">
                <select
                  {...register(
                    `documents.${index}.type`,
                  )}
                  className={
                    inputClassName
                  }
                >
                  <option value="Contrato Social">
                    Contrato Social
                  </option>
                  <option value="Cartão CNPJ">
                    Cartão CNPJ
                  </option>
                  <option value="Documento do Responsável">
                    Documento do Responsável
                  </option>
                  <option value="Comprovante Bancário">
                    Comprovante Bancário
                  </option>
                  <option value="Outros">
                    Outros
                  </option>
                </select>
              </FormField>

              <FormField label="Nome">
                <input
                  {...register(
                    `documents.${index}.name`,
                  )}
                  className={
                    inputClassName
                  }
                />
              </FormField>

              <label className="sm:col-span-2">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.08em] text-slate-500">
                  Arquivo
                </span>

                <div className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-slate-400">
                  <UploadCloud
                    size={25}
                    className="text-slate-400"
                  />

                  <strong className="mt-3 text-xs font-black text-slate-700">
                    Selecionar arquivo
                  </strong>

                  <span className="mt-1 text-[10px] font-medium text-slate-400">
                    PDF, JPG ou PNG
                  </span>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(event) =>
                      handleFile(
                        index,
                        event.target
                          .files?.[0],
                      )
                    }
                  />
                </div>
              </label>

              <input
                type="hidden"
                {...register(
                  `documents.${index}.url`,
                )}
              />
            </div>
          </article>
        ))
      )}
    </div>
  );
}

function ReviewStep({ control }) {
  const values = useWatch({
    control,
  });

  return (
    <div className="space-y-4 text-left">
      <ReviewSection
        title="Empresa"
        items={[
          [
            'Nome fantasia',
            values.tradeName,
          ],
          [
            'Razão social',
            values.corporateName,
          ],
          ['CNPJ', values.cnpj],
          [
            'Tipo',
            values.companyType,
          ],
        ]}
      />

      <ReviewSection
        title="Responsável"
        items={[
          [
            'Nome',
            values.responsibleName,
          ],
          [
            'CPF',
            values.responsibleCpf,
          ],
          ['E-mail', values.email],
          [
            'Telefone',
            values.responsiblePhone,
          ],
        ]}
      />

      <ReviewSection
        title="Endereço"
        items={[
          [
            'CEP',
            values.zipCode,
          ],
          [
            'Logradouro',
            `${values.street ?? ''}, ${values.number ?? ''}`,
          ],
          [
            'Bairro',
            values.district,
          ],
          [
            'Cidade/UF',
            `${values.city ?? ''}/${values.state ?? ''}`,
          ],
        ]}
      />

      <ReviewSection
        title="Conta bancária"
        items={[
          [
            'Banco',
            values.bankAccount
              ?.bankName,
          ],
          [
            'Agência',
            values.bankAccount?.agency,
          ],
          [
            'Conta',
            values.bankAccount?.account,
          ],
          [
            'Titular',
            values.bankAccount?.holder,
          ],
          [
            'Chave Pix',
            values.bankAccount?.pixKey,
          ],
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SummaryCard
          label="Gestores"
          value={
            values.managers?.length ?? 0
          }
        />

        <SummaryCard
          label="Documentos"
          value={
            values.documents?.length ??
            0
          }
        />
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Check size={16} />
        </span>

        <div>
          <strong className="block text-sm font-black text-emerald-800">
            Cadastro pronto para salvar
          </strong>

          <p className="mt-1 text-xs font-medium leading-5 text-emerald-700">
            Revise as informações e
            pressione Salvar Agência.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  items,
}) {
  return (
    <section className="rounded-[22px] border border-slate-200 bg-white p-5">
      <h4 className="text-sm font-black text-slate-900">
        {title}
      </h4>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl bg-slate-50 p-4"
          >
            <span className="block text-[10px] font-black uppercase tracking-wide text-slate-400">
              {label}
            </span>

            <strong className="mt-1 block break-words text-sm font-black text-slate-700">
              {value || '—'}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
}) {
  return (
    <div className="rounded-[22px] bg-slate-900 p-5 text-white">
      <span className="text-xs font-bold text-slate-400">
        {label}
      </span>

      <strong className="mt-2 block text-3xl font-black">
        {value}
      </strong>
    </div>
  );
}

function EmptyBlock({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="rounded-[22px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <Icon
        size={25}
        className="mx-auto text-slate-300"
      />

      <strong className="mt-3 block text-sm font-black text-slate-700">
        {title}
      </strong>

      <p className="mt-1 text-xs font-medium text-slate-400">
        {description}
      </p>
    </div>
  );
}
