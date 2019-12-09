const NAMESPACE = "ticket";

//mutations
const SET_TICKETS = "SET_TICKETS";
const SET_STATUSES = "SET_STATUSES";


//getters
const TICKETS = "TICKETS";
const STATUSES = "STATUSES";

//Actions
const GET_TICKETS = "GET_TICKETS";
const REGISTER = "REGISTER";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const GET_STATUSES = "GET_STATUSES";

export const Actions = {
  GET_TICKETS,
  REGISTER,
  UPDATE,
  DELETE,
  GET_STATUSES
};

export const Mutations = {
  SET_TICKETS,
  SET_STATUSES
};

export const Getters = {
  TICKETS,
  STATUSES
};

/**
 * Key item.
 * @param {String} key Key item
 */
export default function(key) {
  return `${NAMESPACE}/${key}`;
}
