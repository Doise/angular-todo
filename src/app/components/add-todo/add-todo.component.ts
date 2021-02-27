import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/app/model/Todo';
import { NotificationService } from 'src/app/services/notification.service';
import { TodoService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  /**
   * form builder.
   */
  dialogData = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    scheduleAt: [null],
    author: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private notifyService: NotificationService
  ) {}

  // "OK" action button
  createNewTodo = (): void => {
    /**
     * checks if all fields are valid.
     */
    if (this.dialogData.status !== 'VALID') {
      this.notifyService.showNotification('Error: Todo is Invalid', undefined);
      return;
    }

    /**
     * add missing fields.
     */
    const todo: Todo = {
      ...this.dialogData.value,
      createdAt: new Date(),
      isDone: false,
    }

    this.todoService.addTodo(todo);
    this.dialogRef.close();
  };

  // "CLOSE" action button
  onNoClick = (): void => {
    this.dialogRef.close();
  };

  //generates a random string from jsonplaceholder.
  generateTodo = () => {
    this.todoService.generateTodo().subscribe((todo) => {
      this.dialogData.patchValue({ body: todo });
    });
  };
}
