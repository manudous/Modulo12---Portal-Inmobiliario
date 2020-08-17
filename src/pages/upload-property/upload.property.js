import {
  getProvinceList,
  getEquipmentsList,
  getSaleTypes,
  insertHome,
} from './upload-property.api';
import {
  setOptionList,
  setCheckboxList,
  formatCheckboxId,
  onAddFeature,
  onRemoveFeature,
  formatDeleteFeatureButtonId,
  onAddImage,
} from './upload-property.helpers';
import {
  onUpdateField,
  onSubmitForm,
  onAddFile,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { history } from '../../core/router';
import { mapPropertyDetailVmToApi } from './upload-property.mappers';
import { formValidation } from './upload-property.validations';

let property = {
  id:'',
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypes: [],
  address: '',
  city: '',
  provinceId: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: [],
  equiptments: [],
  images: [],
};

Promise.all([getProvinceList(), getEquipmentsList(), getSaleTypes()]).then(
  ([provinceList, equipmentsList, saleTypesList]) => {
    setOptionList(provinceList, 'province');
    setCheckboxList(equipmentsList, 'equipments');
    setCheckboxList(saleTypesList, 'saleTypes');
    setEvents(saleTypesList, 'saleTypes');
    setEvents(equipmentsList, 'equiptments');
  }
);

// Insert or remove items from checkbox in equipments and saletypes.

const addElement = (value, id) =>
  (property = { ...property, [id]: [...property[id], value] });

const removeElement = (value, id) => {
  const ids = property[id].indexOf(value);
  property[id].splice(ids, 1);
};

const setEvents = (list, id) => {
  list.forEach((element) => {
    const ids = formatCheckboxId(element);
    onUpdateField(ids, (event) => {
      const value = event.target.value;
      event.target.checked ? addElement(value, id) : removeElement(value, id);
    });
  });
};

// Capture values from text areas

const capture = (id) => {
  onUpdateField(id, (event) => {
    const value = event.target.value;
    property = {
      ...property,
      [id]: value,
    };

    formValidation.validateField(id, property[id]).then((result) => {
      onSetError(id, result);
    });
    return property;
  });
};

capture('title');
capture('notes');
capture('email');
capture('phone');
capture('price');
capture('address');
capture('city');
capture('province');
capture('squareMeter');
capture('rooms');
capture('bathrooms');
capture('locationUrl');

// Insert features and delete them

onSubmitForm('insert-feature-button', () => {
  const feature = document.getElementById('newFeature').value;
  if (feature) {
    property = {
      ...property,
      mainFeatures: [...property.mainFeatures, feature],
    };
    onAddFeature(feature);

    const ids = formatDeleteFeatureButtonId(feature);
    onSubmitForm(ids, () => {
      onRemoveFeature(feature);
      const id = property.mainFeatures.indexOf(feature);
      property.mainFeatures.splice(id, 1);
    });
  }
});

// Add Images

onAddFile('add-image', (img) => {
  onAddImage(img);

  return (property = {
    ...property,
    images: [...property.images, img],
  });
});

// Send formulary

onSubmitForm('save-button', () => {
  formValidation.validateForm(property).then((result) => {
    onSetFormErrors(result);
    console.log(result);
    const toApi = mapPropertyDetailVmToApi(property);
    console.log(toApi);
      if (result.succeeded) {
        insertHome(toApi).then(() => {
          history.back();
        });
      }
  });
});
