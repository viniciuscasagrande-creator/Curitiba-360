import {
  findDetailBySlugRepository,
  findRelatedItemsRepository,
} from "../repositories/detailRepository";

function formatAddress(address) {
  if (!address) {
    return "";
  }

  return [
    `${address.street}, ${address.number}`,
    address.neighborhood,
    `${address.city} - ${address.state}`,
    address.zipCode,
  ]
    .filter(Boolean)
    .join(" · ");
}

function timeToMinutes(time) {
  if (!time) {
    return null;
  }

  const [hours, minutes] = time
    .split(":")
    .map(Number);

  return hours * 60 + minutes;
}

export function getOpeningStatus(
  schedule = [],
  currentDate = new Date()
) {
  const currentDay =
    currentDate.getDay();

  const currentMinutes =
    currentDate.getHours() * 60 +
    currentDate.getMinutes();

  const todaySchedule =
    schedule.find(
      (entry) =>
        Number(entry.day) === currentDay
    );

  if (
    !todaySchedule ||
    todaySchedule.closed
  ) {
    return {
      isOpen: false,
      label: "Fechado hoje",
      detail: "",
    };
  }

  const openingMinutes =
    timeToMinutes(
      todaySchedule.openingTime
    );

  const closingMinutes =
    timeToMinutes(
      todaySchedule.closingTime
    );

  if (
    currentMinutes >= openingMinutes &&
    currentMinutes < closingMinutes
  ) {
    return {
      isOpen: true,
      label: "Aberto agora",
      detail: `Fecha às ${todaySchedule.closingTime}`,
    };
  }

  if (
    currentMinutes < openingMinutes
  ) {
    return {
      isOpen: false,
      label: "Fechado",
      detail: `Abre às ${todaySchedule.openingTime}`,
    };
  }

  return {
    isOpen: false,
    label: "Fechado",
    detail: "Encerrado por hoje",
  };
}

export async function getDetailBySlug(
  slug
) {
  if (!slug?.trim()) {
    return null;
  }

  const item =
    await findDetailBySlugRepository(
      slug
    );

  if (!item) {
    return null;
  }

  const relatedItems =
    await findRelatedItemsRepository(
      item
    );

  return {
    item: {
      ...item,
      formattedAddress:
        formatAddress(item.address),
    },

    relatedItems,

    reviews: item.reviews || [],

    openingStatus:
      getOpeningStatus(
        item.schedule
      ),
  };
}
