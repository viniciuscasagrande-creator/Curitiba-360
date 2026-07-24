import {
  AGENCY_CHANGE_TYPES,
} from './agencyRealtimeUtils';

/**
 * Atualiza a lista local sem recarregar tudo.
 */
export function applyRealtimeChanges(
  currentItems = [],
  changes = [],
) {
  let items = [...currentItems];

  changes.forEach((change) => {
    if (!change.agency?.id) {
      return;
    }

    const index = items.findIndex(
      (item) => item.id === change.agency.id,
    );

    switch (change.type) {
      case AGENCY_CHANGE_TYPES.ADDED:
        if (index === -1) {
          const targetIndex =
            change.newIndex >= 0 && change.newIndex <= items.length
              ? change.newIndex
              : items.length;

          items.splice(
            targetIndex,
            0,
            change.agency,
          );
        } else {
          items[index] = {
            ...items[index],
            ...change.agency,
          };
        }
        break;

      case AGENCY_CHANGE_TYPES.MODIFIED:
        if (index >= 0) {
          items[index] = {
            ...items[index],
            ...change.agency,
          };
        } else {
          items.push(change.agency);
        }
        break;

      case AGENCY_CHANGE_TYPES.REMOVED:
        if (index >= 0) {
          items.splice(index, 1);
        }
        break;

      default:
        break;
    }
  });

  items.sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });

  return items;
}
