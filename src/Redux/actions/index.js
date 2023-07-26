// Action types that represent different actions in the Redux store
export const Addproducts = "Addproducts";
export const Addtocart = "Addtocart";
export const product = "product";
export const cartlist = "cartlist";
export const updatecart = "updatecart";
export const delete_item = "delete_item";

//  function to add products to the Redux store
export function addproducts(products) {
  return {
    type: Addproducts,
    products,
  };
}

//  function to add items to the cart in the Redux store
export function addCart(cart) {
  return {
    type: Addtocart,
    cart,
  };
}

//  function to set the selected product for viewing
export function ProductToview(item) {
  return {
    type: product,
    view: item,
  };
}

// Action creator function to get the list of items in the cart
export function CartItems() {
  return {
    type: cartlist,
  };
}

// function to update an item in the cart
export function updateCart(item) {
  return {
    type: updatecart,
    updatedItem: item,
  };
}

//  function to delete an item from the cart
export function DeleteCart(item) {
  return {
    type: delete_item,
    item,
  };
}
