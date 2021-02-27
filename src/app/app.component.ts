import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public addModal: MatDialog) {}

  /**
   * Fab butoon - opens the 'Add todo' dialog modal.
   */
  addTodo = (): void => {
    this.addModal.open(AddTodoComponent, { width: '550px' });
  };
}
