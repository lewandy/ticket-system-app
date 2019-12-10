const NAMESPACE = "timeEntry";

//mutations
const SET_TIME_ENTRY = "SET_TIME_ENTRY";

//getters
const TIME_ENTRY = "TIME_ENTRY";

//Actions
const GET_TIME_ENTRY = "GET_TIME_ENTRY";
const REGISTER = "REGISTER";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

export const Actions = {
  GET_TIME_ENTRY,
  REGISTER,
  UPDATE,
  DELETE
};

export const Mutations = {
  SET_TIME_ENTRY
};

export const Getters = {
  TIME_ENTRY
};

/**
 * Key item.
 * @param {String} key Key item
 */
export default function(key) {
  return `${NAMESPACE}/${key}`;
}
