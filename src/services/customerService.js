import http from './httpService';

const resourceUrl = 'customers';

function getCustomerUrl(id) {
  return `${resourceUrl}/${id}`;
}

export const getCustomers = () => {
  return http.get(resourceUrl);
};

export const getCustomer = id => {
  return http.get(getCustomerUrl(id));
};

export const saveCustomer = customer => {
  if (!customer._id) {
    return http.post(resourceUrl, customer);
  }

  const body = { ...customer };
  delete body._id;
  return http.put(getCustomerUrl(customer._id), body);
};

export const deleteCustomer = id => {
  return http.delete(getCustomerUrl(id));
};
