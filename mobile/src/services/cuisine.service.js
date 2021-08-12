import axios from 'axios';
import {BASE_URL} from "./constants";
const camelCaseRecursive = require('camelcase-keys-recursive');


export default class CuisineService {
  static getCuisines = async (page, size, search) =>  {
    let response = await axios.get(
      BASE_URL + 'cuisines/',
      {params: {page, size, search}}
    );
    return camelCaseRecursive(response.data);
  }
}
