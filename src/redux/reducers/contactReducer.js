const initialState = [
  {
    id: 0,
    name: "shihas",
    email: "shihas@gmail.com",
    mobile: "1234567890",
  },
  {
    id: 1,
    name: "test",
    email: "test@gmail.com",
    mobile: "9874561230",
  },
  {
    id: 2,
    name: "test444",
    email: "aaatest@gmail.com",
    mobile: "9874561230",
  },
  {
    id: 3,
    name: "test333",
    email: "tes333t@gmail.com",
    mobile: "77777",
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id == action.payload.id ? action.payload : contact
      );
      state = updateState;
      console.log(state);
      return state;
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const filterContact = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = filterContact;
      return state;
    default:
      return state;
  }
};
export default contactReducer;
