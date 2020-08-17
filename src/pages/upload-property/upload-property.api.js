import Axios from 'axios';

const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;

export const getProvinceList = () =>
  Axios.get(provinceListUrl).then((response) => {
    return response.data;
  });

const equipmentsUrl = `${process.env.BASE_API_URL}/equipments`;

export const getEquipmentsList = () =>
  Axios.get(equipmentsUrl).then((response) => {
    return response.data;
  });

const saleTypes = `${process.env.BASE_API_URL}/saleTypes`;

export const getSaleTypes = () =>
  Axios.get(saleTypes).then((response) => {
    return response.data;
  });

const newHome = `${process.env.BASE_API_URL}/properties`;

export const insertHome = home =>
  Axios.post(newHome, home).then(response => {
    return response.data;
  })