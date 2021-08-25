import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos_list = [];
  err_msg = '';
  selected_todo = {
    "userId": 0,
    "id": 0,
    "title": "",
    "completed": false,
    isDue: false
  }

  constructor(public _todosService: TodosService) { }

  ngOnInit(): void {
    this._todosService.getToDosList().subscribe(
      (res) => {
        //this.todos_list = res;
      },
      (err) => {
        this.err_msg = 'Error in fetching Todos';
      }
    )
  }

  getTodo(id: string) {
    this._todosService.getToDoDetails(id).subscribe(
      (res: any) => {
        this.selected_todo = res;
      },
      (err) => {
        this.err_msg = 'Error in fetching Todo with id ' + id;
      }
    )
  }

}
