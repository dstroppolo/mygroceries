import {config} from '../constants/config';
import AsyncStorage from '@react-native-community/async-storage';

const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('jwt');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const fetchMainCategories = async () => {
  let auth = await getAuthToken();
  let res = await fetch(`${config.api}/categories`, {
    headers: {Authorization: auth},
  });
  return await res.json();
};

export const fetchSubCategories = async (selectedMain) => {
  let auth = await getAuthToken();
  let res = await fetch(`${config.api}/categories/${selectedMain}`, {
    headers: {Authorization: auth},
  });
  return await res.json();
};

export const fetchProducts = async (selectedSub, limit, offset) => {
  let auth = await getAuthToken();
  let res = await fetch(
    `${config.api}/products?category=${selectedSub}&limit=${limit}&offset=${offset}`,
    {
      headers: {Authorization: auth},
    },
  );
  return await res.json();
};

export const fetchProduct = async (code) => {
  let auth = await getAuthToken();
  let res = await fetch(`${config.api}/products/barcode/${code}`,
    {
      headers: {Authorization: auth},
    },
  );
  return await res.json();
};

export const fetchLogin = async (email, password) => {
  let res = await fetch(`${config.auth}/login`, {
    method: 'post',
    body: JSON.stringify({email, password}),
  });
  return await res.json();
};
