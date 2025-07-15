export const API_PREFIX = "/api";

export const enum ApplicationRoutes {
  TODOS = `${API_PREFIX}`,
  AUTH = `${API_PREFIX}`,
}

export const enum TodosRoutes {
  CREATE = "/todos",
  GET_ALL = "/todos",
  GET_BY_ID = "/todos/:id",
  DELETE_BY_ID = "/todos/:id",
  // 新增分页路由
  GET_PAGINATED = "/todos/paginated",
  GET_USER_PAGINATED = "/todos/my/paginated",
}

export const enum UsersRoutes {
  Register = "/register",
  Login = "/login",
  Profile = "/profile",
  UpdateProfile = "/profile/update",
}
