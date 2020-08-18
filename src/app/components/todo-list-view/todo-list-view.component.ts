import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { TodoService } from "../../services/todo-service/todo.service";
import { Router } from "@angular/router";

@Component({
  selector: "todo-list-view",
  templateUrl: "./todo-list-view.component.html",
  styleUrls: ["./todo-list-view.component.css"],
})
export class TodoListViewComponent implements OnInit {
  public todos;

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
    });
  }

  deleteById(id) {
    this.todoService.deleteTodo(id).subscribe();
    location.reload();
  }
}
