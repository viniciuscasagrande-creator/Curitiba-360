import { HOME_BANNERS, HOME_PLACES } from "../mocks/homeMock";

export async function fetchHomeBannersRepository() {
  // Firestore:
  //
  // const querySnapshot = await getDocs(collection(db, "banners"));
  // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return [...HOME_BANNERS];
}

export async function fetchHomePlacesRepository() {
  // Firestore:
  //
  // const querySnapshot = await getDocs(collection(db, "places"));
  // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Get dynamic local favorite status from localStorage if any
  const favorites = JSON.parse(localStorage.getItem("curitiba360:favorites") || "[]");
  return HOME_PLACES.map(place => ({
    ...place,
    favorite: favorites.includes(place.id)
  }));
}
