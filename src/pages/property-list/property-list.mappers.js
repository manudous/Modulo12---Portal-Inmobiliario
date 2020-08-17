export const mapPropertyListApiToVm = (propertyList) =>
  Array.isArray(propertyList)
    ? propertyList.map((property) => mapPropertyApiToVm(property))
    : [];

const mapPropertyApiToVm = (property) => ({
  id: property.id,
  title: property.title,
  rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
  squareMeter: `${property.squareMeter}m2`,
  notes: `${property.notes.substring(0, 240)}...`,
  price: `${property.price.toLocaleString()} €`,
  image: Array.isArray(property.images) ? property.images[0] : '',
});

const getRoomWord = (rooms) => (rooms > 1 ? 'habitaciones' : 'habitación');

export const mapFilterToQueryParams = (filter) => {
  let queryParams = '';

  if (filter.saleTypeId) {
    queryParams = `${queryParams}saleTypeIds_like=${filter.saleTypeId}&`;
  }
  if (filter.provinceId) {
    queryParams = `${queryParams}provinceId=${filter.provinceId}&`;
  }
  if (filter.minRooms) {
    queryParams = `${queryParams}rooms_gte=${filter.minRooms}&`;
  }
  if (filter.minBathrooms) {
    queryParams = `${queryParams}bathrooms_gte=${filter.minBathrooms}&`;
  }
  if (filter.minPrice) {
    queryParams = `${queryParams}price_gte=${filter.minPrice}&`;
  }
  if (filter.maxPrice) {
    queryParams = `${queryParams}price_lte=${filter.maxPrice}&`;
  }
  return queryParams.slice(0, -1);//slice es para quitar el & del último por si da error
};
