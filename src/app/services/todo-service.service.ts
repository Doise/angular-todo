import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../model/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  /**
   * todos subject (forestore coolection)
   */
  private todosSource = this.store
    .collection<Todo>('todos')
    .snapshotChanges()
    .pipe<Todo[]>(
      // pipe the list and add the missing values
      map((data: any) => {
        return data.map((doc: any) => {
          const data = doc.payload.doc.data();

          /**
           * firebase stores date values as timestams. 
           * this restores the original date value by using .toDate() function.
           */
          return {
            ...data,
            id: doc.payload.doc.id,
            createdAt: data.createdAt ? data.createdAt.toDate() : null,
            scheduleAt: data.scheduleAt ? data.scheduleAt.toDate() : null,
          };
        });
      })
    );

  constructor(private http: HttpClient, private store: AngularFirestore) {}

  /**
   * returns the observable store.
   */
  getTodos = (): Observable<Todo[]> => {
    return this.todosSource;
  };

  /**
   * Adds a todo to the database.
   * 
   * @param { Todo } todo The constructed todo to add.
   */
  addTodo = (todo: Todo) => {
    this.store.collection('todos').add(todo);
  };

  /**
   * Deletes a todo from the database.
   * 
   * @param { Todo } todo The constructed todo to delete.
   */
  deleteTodo = (todo: Todo) => {
    this.store.collection('todos').doc(todo.id).delete();
  };

  /**
   * Toggles the "isDone" prop in the database for a given todo.
   * 
   * @param { Todo } todo The constructed todo to toggle the is done prop for.
   */
  toggleIsDone = (todo: Todo) => {
    this.store.collection("todos").doc(todo.id).update({ isDone: todo.isDone })
  };

  /**
   * Gets a random todo string from a fake json api.
   */
  generateTodo = (): Observable<string> => {
    const postId = Math.floor(Math.random() * 201);
    const url = `https://jsonplaceholder.typicode.com/todos/${postId}`;

    return this.http.get(url).pipe(map((x) => (x as Todo).title));
  };
}
