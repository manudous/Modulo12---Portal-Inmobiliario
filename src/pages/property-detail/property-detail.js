import {
  getHomes,
  getEquipmentsList,
  insertContact,
} from './property-detail.api';
import {
  mapPropertyDetailApiToVm,
  mapContactVmToApi,
} from './property-detail.mappers';
import { setPropertyValues } from './property-detail.helpers';
import { history } from '../../core/router';
import {
  onUpdateField,
  onSetError,
  onSetFormErrors,
  onSubmitForm,
} from '../../common/helpers';
import { formValidation } from './property-detail.validations';

let property = {
  id: '',
  title: '',
  notes: '',
  price: '',
  city: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  mainFeatures: '',
  equipments: '',
  mainImage: '',
  images: '',
};

const params = history.getParams();

Promise.all([getHomes(params.id), getEquipmentsList()]).then(
  ([propertyList, equipmentsList]) => {
    loadHomes(propertyList, equipmentsList);
  }
);

const loadHomes = (propertyList, equipmentsList) => {
  const viewModelPropertyList = mapPropertyDetailApiToVm(
    propertyList,
    equipmentsList
  );
  setPropertyValues(viewModelPropertyList);
};

let contact = {
  email: '',
  message: '',
};

onUpdateField('email', (event) => {
  const value = event.target.value;
  contact = {
    ...contact,
    email: value,
  };
  formValidation.validateField('email', contact.email).then((result) => {
    onSetError('email', result);
  });
});

onUpdateField('message', (event) => {
  const value = event.target.value;
  contact = {
    ...contact,
    message: value,
  };
  formValidation.validateField('message', contact.message).then((result) => {
    onSetError('message', result);
  });
});

onSubmitForm('contact-button', () => {
  formValidation.validateForm(contact).then((result) => {
    onSetFormErrors(result);
    console.log(result);
    const toApi = mapContactVmToApi(contact);

    if (result.succeeded) {
      insertContact(toApi).then(() => {
        history.back();
      });
    }
  });
});
