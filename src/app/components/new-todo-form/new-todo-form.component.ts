import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { TodoService } from "../../services/todo-service/todo.service";
import { Router } from "@angular/router";

@Component({
  selector: "new-todo-form",
  templateUrl: "./new-todo-form.component.html",
  styleUrls: ["./new-todo-form.component.css"],
})
export class NewTodoFormComponent implements OnInit {
  formData = {
    id: null,
    description: "",
    category: "",
    date: "",
  };

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form) {
    console.log("in onSubmit", form.valid);
    if (form.valid === true) {
      this.todoService.addTodo(this.formData).subscribe();
      this.router.navigate(["/todos"]);
    } else {
      console.log("non valid form!!");
    }
  }
}
