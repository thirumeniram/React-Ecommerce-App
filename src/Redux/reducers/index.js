
import {
  Addproducts,
  Addtocart,
  product,
  cartlist,
  updatecart,
  delete_item,
} from "../actions";

// Initial state of the application
let initialState = {
  products: [],
  cart: [],
  itemToDisplay: "",
  totalCart: 0,
};

// Reducer function that updates the state based on dispatched actions
export default function products(state = initialState, action) {
  switch (action.type) {
    // When products are added to the store, update the products array in the state
    case Addproducts:
      return {
        ...state,
        products: action.products,
      };

    // When an item is added to the cart, update the cart array in the state
    case Addtocart:
      let flag = state.cart.indexOf(action.cart);
      if (flag !== -1) {
        action.cart.qty += 1; // If the item is already in the cart, increase its quantity
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          cart: [action.cart, ...state.cart], // If the item is not in the cart, add it to the cart array
        };
      }

    // When a product is selected to view, update the itemToDisplay in the state
    case product:
      return {
        ...state,
        itemToDisplay: action.view,
      };

    // When the total items in the cart need to be calculated, update the totalCart in the state
    case cartlist:
      let { cart } = state;
      let total = cart.reduce((total, item) => {
        return (total += item.qty); 
      }, 0);
      return {
        ...state,
        totalCart: total,
      };

    // When an item in the cart needs to be updated, update the cart array in the state
    case updatecart:
      let index = state.cart.indexOf(action.updatedItem);
      let updatedCart = null;
      if (index !== -1) {
        state.cart[index] = action.updatedItem;
        updatedCart = state.cart;
      }
      return {
        ...state,
        cart: [...updatedCart],
      };

    // When an item needs to be deleted from the cart, update the cart array in the state
    case delete_item:
      const position = state.cart.indexOf(action.item);
      if (position !== -1) {
        const updatedCart = [...state.cart];
        updatedCart.splice(position, 1); 
        return {
          ...state,
          cart: updatedCart,
        };
      }

    // If no action type matches, return the current state unchanged
    default:
      return state;
  }
}
