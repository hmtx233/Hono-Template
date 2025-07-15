import { z } from 'zod';

export const createTodoSchema = z.object({
  description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
  is_completed: z.boolean().optional().default(false)
});

export const updateTodoSchema = z.object({
  description: z.string().min(1, 'Description is required').max(500, 'Description too long').optional(),
  is_completed: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;