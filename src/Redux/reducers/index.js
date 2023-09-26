import {
  Addproducts,
  Addtocart,
  product,
  cartlist,
  updatecart,
  delete_item,
  DecrementItemQty,
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

    
    case Addtocart:
      // Check if the item is already in the cart
      let existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.cart.id
      );

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, create a new object with the incremented quantity
        let updatedItem = {
          ...state.cart[existingItemIndex],
          qty: state.cart[existingItemIndex].qty + 1,
        };

        // Create a new cart array with the updated item
        let updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex ? updatedItem : item
        );

        // Return the new state with the updated cart
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If the item is not in the cart, add it to the cart array with quantity set to 1
        return {
          ...state,
          cart: [{ ...action.cart, qty: 1 }, ...state.cart],
        };
      }

    case DecrementItemQty:
      // Check if the item is in the cart
      let itemIndex = state.cart.findIndex(
        (item) => item.id === action.cart.id
      );

      if (itemIndex !== -1) {
        // If the item is in the cart, create a new object with the decremented quantity
        // Ensure the quantity does not go below 1
        let updatedItem = {
          ...state.cart[itemIndex],
          qty: state.cart[itemIndex].qty - 1,
        };

        // Create a new cart array with the updated item
        let updatedCart = state.cart.map((item, index) =>
          index === itemIndex ? updatedItem : item
        );

        // Return the new state with the updated cart
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If the item is not found in the cart, return the current state
        return state;
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
