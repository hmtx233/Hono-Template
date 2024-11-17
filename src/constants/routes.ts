const API_PREFIX = "/api";

export const enum ApplicationRoutes {
  TODOS = `${API_PREFIX}/todos`,
}
export const enum TodosRoutes {
  CREATE_TODO = "/",
  GET_ALL_TODOS = "/",
  GET_TODO_BY_ID = "/:id",
}
