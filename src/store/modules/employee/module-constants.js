const NAMESPACE = "employee";

//mutations
const SET_EMPLOYEES = "SET_EMPLOYEES";

//getters
const EMPLOYEES = "EMPLOYEES";

//Actions
const GET_EMPLOYEES = "GET_EMPLOYEES";
const REGISTER = "REGISTER";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

export const Actions = {
  GET_EMPLOYEES,
  REGISTER,
  UPDATE,
  DELETE
};

export const Mutations = {
  SET_EMPLOYEES
};

export const Getters = {
  EMPLOYEES
};

/**
 * Key item.
 * @param {String} key Key item
 */
export default function(key) {
  return `${NAMESPACE}/${key}`;
}
