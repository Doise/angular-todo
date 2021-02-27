import { Component, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Todo } from 'src/app/model/Todo';
import { TodoService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {}

  // delete todo
  deleteTodo = () => {
    this.todoService.deleteTodo(this.todo);
  };

  // is done checkbox
  toggleIsDone = (isDone: MatCheckboxChange) => {
    this.todo.isDone = isDone.checked;
    this.todoService.toggleIsDone(this.todo)
  }
}
