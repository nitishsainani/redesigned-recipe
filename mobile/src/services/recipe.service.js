import axios from 'axios';
const camelCaseRecursive = require('camelcase-keys-recursive');
import {BASE_URL} from "./constants";


export default class RecipeService {
  static getRecipes = async (page, size, search, cuisines, ingredients) =>  {
    let response = await axios.get(
      BASE_URL + 'recipes/',
      {params: {page, size, search, cuisines, ingredients}}
    );
    return camelCaseRecursive(response.data);
  }

  static getRecipeDetail = async (recipe_id) => {
    let response = await axios.get(
      BASE_URL + 'recipes/' + recipe_id + '/',
    );
    return camelCaseRecursive(response.data);
  }
}
