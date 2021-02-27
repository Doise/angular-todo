import { Component } from '@angular/core';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent {
  todos: Todo[] = [];

  constructor(public todoService: TodoService) {}
}
