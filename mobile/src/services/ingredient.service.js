import axios from 'axios';
import {BASE_URL} from "./constants";
const camelCaseRecursive = require('camelcase-keys-recursive');


export default class IngredientService {
  static getIngredients = async (page, size, search) =>  {
    let response = await axios.get(
      BASE_URL + 'ingredients/',
      {params: {page, size, search}}
    );
    return camelCaseRecursive(response.data);
  }
}
