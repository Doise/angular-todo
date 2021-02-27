/**
 * Todo model.
 */
export interface Todo {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  scheduleAt?: Date;
  author: string;
  isDone: boolean;
}
