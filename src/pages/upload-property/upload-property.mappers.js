export const mapPropertyDetailVmToApi = (property) => {
  return {
    ...property,
    price: parseInt(property.price),
    squareMeter: parseInt(property.squareMeter),
    rooms: parseInt(property.rooms),
    bathrooms: parseInt(property.bathrooms),
    saleTypeIds: property.saleTypes,   
    equipmentIds: property.equiptments,
  };
};
