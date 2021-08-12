import AsyncStorage from '@react-native-async-storage/async-storage';

const SHOPPING_LIST_KEY = 'shoppingList';

export default class ShoppingListService {
  static async getShoppingList() {
    let shoppingListRaw = await AsyncStorage.getItem(SHOPPING_LIST_KEY)
    let shoppingListObject = shoppingListRaw ? JSON.parse(shoppingListRaw) : {}
    return Object.entries(shoppingListObject).map(item => item[0]);
  }

  static async addItem(item) {
    let shoppingListRaw = await AsyncStorage.getItem(SHOPPING_LIST_KEY)
    let shoppingListObject = shoppingListRaw ? JSON.parse(shoppingListRaw) : {}
    shoppingListObject[item] = true;
    AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingListObject));
  }

  static async addMultipleItem(listItem) {
    let shoppingListRaw = await AsyncStorage.getItem(SHOPPING_LIST_KEY)
    let shoppingListObject = shoppingListRaw ? JSON.parse(shoppingListRaw) : {}
    listItem.map(item => {shoppingListObject[item] = true;})
    AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingListObject))
  }

  static async removeItem(item) {
    let shoppingListRaw = await AsyncStorage.getItem(SHOPPING_LIST_KEY)
    let shoppingListObject = shoppingListRaw ? JSON.parse(shoppingListRaw) : {}
    shoppingListObject[item] = undefined;
    AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingListObject))
  }

  static async clearShoppingList() {
    AsyncStorage.removeItem(SHOPPING_LIST_KEY)
  }

  static async areItemsInShoppingList(itemsList) {
    if(!itemsList) {
      return [];
    }
    let shoppingListRaw = await AsyncStorage.getItem(SHOPPING_LIST_KEY)
    let shoppingListObject = shoppingListRaw ? JSON.parse(shoppingListRaw) : {}
    return itemsList.map(item => {
      return item in shoppingListObject
    });
  }
}
