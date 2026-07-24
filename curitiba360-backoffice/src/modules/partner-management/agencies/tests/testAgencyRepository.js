import {
  agencyRepository,
} from '../repositories/agencyRepository';

export async function testAgencyRepository() {
  let createdAgency = null;

  try {
    createdAgency =
      await agencyRepository.create({
        tradeName:
          'Agência Teste Curitiba',

        corporateName:
          'Agência Teste Curitiba LTDA',

        cnpj:
          '00.000.000/0001-00',

        companyType:
          'Agência de Turismo',

        responsibleName:
          'Responsável Teste',

        responsibleCpf:
          '000.000.000-00',

        email:
          'teste@curitiba360.com.br',

        responsiblePhone:
          '(41) 99999-9999',

        zipCode:
          '80000-000',

        street:
          'Rua de Teste',

        number: '100',

        district: 'Centro',

        city: 'Curitiba',

        state: 'PR',

        country: 'Brasil',

        status:
          'Pendente de Aprovação',

        bankAccount: {
          bankName:
            'Banco Teste',

          agency: '0001',

          account:
            '12345-6',

          accountType:
            'Conta Corrente',

          holder:
            'Agência Teste Curitiba LTDA',

          holderDocument:
            '00.000.000/0001-00',
        },

        managers: [],
        documents: [],
      });

    console.info(
      'Agência criada:',
      createdAgency,
    );

    const foundAgency =
      await agencyRepository.findById(
        createdAgency.id,
      );

    console.info(
      'Agência encontrada:',
      foundAgency,
    );

    const updatedAgency =
      await agencyRepository.update(
        createdAgency.id,
        {
          ...createdAgency,

          tradeName:
            'Agência Teste Atualizada',
        },
      );

    console.info(
      'Agência atualizada:',
      updatedAgency,
    );

    const agencies =
      await agencyRepository.list();

    console.info(
      'Lista de agências:',
      agencies,
    );

    await agencyRepository.remove(
      createdAgency.id,
    );

    console.info(
      'Agência de teste removida.',
    );
  } catch (error) {
    console.error(
      'Erro no teste do repository:',
      error,
    );

    if (createdAgency?.id) {
      try {
        await agencyRepository.remove(
          createdAgency.id,
        );
      } catch {
        // Evita manter o registro de teste.
      }
    }
  }
}
