import {
  useEffect,
  useMemo,
  useState,
} from 'react';

export function useAgencySelection(
  visibleAgencies = [],
) {
  const [selectedIds, setSelectedIds] =
    useState([]);

  const visibleIds = useMemo(
    () =>
      visibleAgencies.map(
        (agency) => agency.id,
      ),
    [visibleAgencies],
  );

  const selectedVisibleIds = useMemo(
    () =>
      visibleIds.filter((id) =>
        selectedIds.includes(id),
      ),
    [visibleIds, selectedIds],
  );

  const allVisibleSelected =
    visibleIds.length > 0 &&
    selectedVisibleIds.length ===
      visibleIds.length;

  const someVisibleSelected =
    selectedVisibleIds.length > 0 &&
    !allVisibleSelected;

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) =>
        visibleIds.includes(id),
      ),
    );
  }, [visibleIds.join('|')]);

  function isSelected(id) {
    return selectedIds.includes(id);
  }

  function toggle(id) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter(
          (selectedId) =>
            selectedId !== id,
        );
      }

      return [...current, id];
    });
  }

  function select(id) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }

  function deselect(id) {
    setSelectedIds((current) =>
      current.filter(
        (selectedId) =>
          selectedId !== id,
      ),
    );
  }

  function toggleAllVisible() {
    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !visibleIds.includes(id),
        ),
      );

      return;
    }

    setSelectedIds((current) => [
      ...new Set([
        ...current,
        ...visibleIds,
      ]),
    ]);
  }

  function selectAllVisible() {
    setSelectedIds((current) => [
      ...new Set([
        ...current,
        ...visibleIds,
      ]),
    ]);
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  return {
    selectedIds,
    selectedCount: selectedIds.length,

    allVisibleSelected,
    someVisibleSelected,

    isSelected,
    toggle,
    select,
    deselect,

    toggleAllVisible,
    selectAllVisible,
    clearSelection,

    setSelectedIds,
  };
}
