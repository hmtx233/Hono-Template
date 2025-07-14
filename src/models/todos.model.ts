export interface Todos {
  id: number;
  description: string;
  is_completed: boolean;  
  user_id: number;      
}

export interface CreateTodoDto {
  description: string;
  is_completed: boolean;
  user_id: number;
}