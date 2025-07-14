const API_PREFIX = "/api";

export const enum ApplicationRoutes {
  TODOS = `${API_PREFIX}`,
}

export const enum TodosRoutes {
  CREATE = "/todos",
  GET_ALL = "/todos",
  GET_BY_ID = "/todos/:id",
  DELETE_BY_ID = "/todos/:id",
}
