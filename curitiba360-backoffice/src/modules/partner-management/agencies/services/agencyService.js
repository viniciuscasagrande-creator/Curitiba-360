import {
  agencyRepository,
} from '../repositories/agencyRepository';

function validateRequiredFields(
  payload,
) {
  if (!payload) {
    throw new Error(
      'Os dados da agência são obrigatórios.',
    );
  }

  if (!payload.tradeName?.trim()) {
    throw new Error(
      'O nome fantasia é obrigatório.',
    );
  }

  if (!payload.corporateName?.trim()) {
    throw new Error(
      'A razão social é obrigatória.',
    );
  }

  if (!payload.cnpj?.trim()) {
    throw new Error(
      'O CNPJ é obrigatório.',
    );
  }

  if (
    !payload.responsibleName?.trim()
  ) {
    throw new Error(
      'O responsável é obrigatório.',
    );
  }

  if (!payload.email?.trim()) {
    throw new Error(
      'O e-mail é obrigatório.',
    );
  }
}

function validateAgencyId(id) {
  if (!id) {
    throw new Error(
      'O identificador da agência é obrigatório.',
    );
  }
}

export const agencyService = {
  async list(options) {
    return agencyRepository.list(
      options,
    );
  },

  async paginate(options) {
    return agencyRepository.paginate(
      options,
    );
  },

  async findByCnpj(cnpj) {
    if (!cnpj) {
      return null;
    }

    return agencyRepository.findByCnpj(
      cnpj,
    );
  },

  async findByEmail(email) {
    if (!email) {
      return null;
    }

    return agencyRepository.findByEmail(
      email,
    );
  },

  async findById(id) {
    validateAgencyId(id);

    const agency =
      await agencyRepository.findById(
        id,
      );

    if (!agency) {
      throw new Error(
        'Agência não encontrada.',
      );
    }

    return agency;
  },

  async create(payload) {
    validateRequiredFields(payload);

    const existingByCnpj =
      await agencyRepository.findByCnpj(
        payload.cnpj,
      );

    if (existingByCnpj) {
      throw new Error(
        'Já existe uma agência cadastrada com este CNPJ.',
      );
    }

    const existingByEmail =
      await agencyRepository.findByEmail(
        payload.email,
      );

    if (existingByEmail) {
      throw new Error(
        'Já existe uma agência cadastrada com este e-mail.',
      );
    }

    return agencyRepository.create({
      ...payload,
      status:
        payload.status ||
        'Pendente de Aprovação',
    });
  },

  async update(
    id,
    payload,
  ) {
    validateAgencyId(id);
    validateRequiredFields(payload);

    return agencyRepository.update(
      id,
      payload,
    );
  },

  async patch(
    id,
    changes,
  ) {
    validateAgencyId(id);

    if (
      !changes ||
      Object.keys(changes).length ===
        0
    ) {
      throw new Error(
        'Nenhuma alteração foi informada.',
      );
    }

    return agencyRepository.patch(
      id,
      changes,
    );
  },

  async approve(id) {
    validateAgencyId(id);

    return agencyRepository.updateStatus(
      id,
      'Ativa',
      {
        approvedAt:
          new Date().toISOString(),

        statusReason: '',
      },
    );
  },

  async reject(
    id,
    reason,
  ) {
    validateAgencyId(id);

    if (!reason?.trim()) {
      throw new Error(
        'Informe o motivo da rejeição.',
      );
    }

    return agencyRepository.updateStatus(
      id,
      'Rejeitada',
      {
        rejectedAt:
          new Date().toISOString(),

        statusReason:
          reason.trim(),
      },
    );
  },

  async suspend(
    id,
    reason = '',
  ) {
    validateAgencyId(id);

    return agencyRepository.updateStatus(
      id,
      'Suspensa',
      {
        suspendedAt:
          new Date().toISOString(),

        statusReason:
          reason.trim(),
      },
    );
  },

  async inactivate(id) {
    validateAgencyId(id);

    return agencyRepository.updateStatus(
      id,
      'Inativa',
      {
        inactivatedAt:
          new Date().toISOString(),
      },
    );
  },

  async reactivate(id) {
    validateAgencyId(id);

    return agencyRepository.updateStatus(
      id,
      'Ativa',
      {
        reactivatedAt:
          new Date().toISOString(),

        statusReason: '',
      },
    );
  },

  async remove(id) {
    validateAgencyId(id);

    return agencyRepository.remove(id);
  },
};

export default agencyService;
