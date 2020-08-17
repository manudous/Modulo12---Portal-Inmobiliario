export const mapPropertyDetailApiToVm = (property, equipmentsList) => {
  return {
    title: property.title,
    notes: property.notes,
    price: `${property.price.toLocaleString()} €`,
    city: property.city,
    squareMeter: `${property.squareMeter} m2`,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    bathrooms: `${property.bathrooms} ${getBathroomsWord(property.bathrooms)}`,
    locationUrl: property.locationUrl,
    mainFeatures: property.mainFeatures,
    equipments: getEquipments(property, equipmentsList),
    mainImage: Array.isArray(property.images) ? property.images[0] : [],
    images: Array.isArray(property.images) ? property.images : [],
  };
};

const getRoomWord = (rooms) => (rooms > 1 ? 'habitaciones' : 'habitación');
const getBathroomsWord = (bathrooms) => (bathrooms > 1 ? 'baños' : 'baño');

const getEquipments = (property, equipmentsList) => {  
  const equipments = property.equipmentIds.map(obj => {   
    return equipmentsList.find(element => element.id === obj).name; 
  });
  return equipments;
};

export const mapContactVmToApi = (contact, property) => {
  return {
    accountId: contact.accountId,
    email: contact.email,
    message: contact.message,
  };
};
