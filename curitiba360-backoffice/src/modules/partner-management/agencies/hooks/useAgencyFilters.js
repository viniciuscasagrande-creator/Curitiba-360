import {
  useMemo,
  useState,
} from 'react';

import { normalizeSearch } from '../../shared/utils/partnerFormatters';

export const initialAgencyFilters = {
  status: 'Ativa',
  search: '',
  city: 'all',
  state: 'all',
  companyType: 'all',
};

export function useAgencyFilters(agencies) {
  const [filters, setFilters] = useState(
    initialAgencyFilters,
  );

  const cities = useMemo(() => {
    return [
      ...new Set(
        agencies
          .map((agency) => agency.city)
          .filter(Boolean),
      ),
    ].sort();
  }, [agencies]);

  const states = useMemo(() => {
    return [
      ...new Set(
        agencies
          .map((agency) => agency.state)
          .filter(Boolean),
      ),
    ].sort();
  }, [agencies]);

  const companyTypes = useMemo(() => {
    return [
      ...new Set(
        agencies
          .map(
            (agency) =>
              agency.companyType,
          )
          .filter(Boolean),
      ),
    ].sort();
  }, [agencies]);

  const filteredAgencies = useMemo(() => {
    const searchTerm = normalizeSearch(
      filters.search,
    );

    return agencies.filter((agency) => {
      const matchesStatus =
        filters.status === 'Todas' ||
        agency.status === filters.status;

      const matchesCity =
        filters.city === 'all' ||
        agency.city === filters.city;

      const matchesState =
        filters.state === 'all' ||
        agency.state === filters.state;

      const matchesCompanyType =
        filters.companyType === 'all' ||
        agency.companyType ===
          filters.companyType;

      const searchableContent = [
        agency.id,
        agency.tradeName,
        agency.corporateName,
        agency.cnpj,
        agency.email,
        agency.responsibleName,
        agency.responsibleCpf,
        agency.city,
        agency.state,
      ];

      const matchesSearch =
        !searchTerm ||
        searchableContent.some((value) =>
          normalizeSearch(value).includes(
            searchTerm,
          ),
        );

      return (
        matchesStatus &&
        matchesCity &&
        matchesState &&
        matchesCompanyType &&
        matchesSearch
      );
    });
  }, [agencies, filters]);

  function updateFilter(field, value) {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetFilters() {
    setFilters(initialAgencyFilters);
  }

  return {
    filters,
    filteredAgencies,

    cities,
    states,
    companyTypes,

    setFilters,
    updateFilter,
    resetFilters,
  };
}
