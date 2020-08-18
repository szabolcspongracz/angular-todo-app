import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo-service/todo.service';
import { Router } from '@angular/router'


@Component({
  selector: 'edit-todo-form',
  templateUrl: './edit-todo-form.component.html',
  styleUrls: ['./edit-todo-form.component.css']
})
export class EditTodoFormComponent implements OnInit {
  public todoDescription = '';
  public todoCategory = '';
  public todoDate = '';
  public id = '';
  public todo = {};

  constructor( private route: ActivatedRoute, private todoService : TodoService, private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodoById(id).subscribe({
      next: todo => {
        console.log('todoById: ', todo[0]);
        this.id = todo[0].id;
        this.todoDescription = todo[0].description;
        this.todoCategory = todo[0].category;
        this.todoDate = todo[0].date;
        }
    });
  }

  onSubmit(form) {
    let updatedTodo = {
      id: this.id, 
      description: this.todoDescription, 
      category: this.todoCategory,
      date: this.todoDate
      }
    if(form.valid === true) {
      this.todoService.updateTodo(updatedTodo).subscribe();
      this.router.navigate(['/todos']);
    }else{
      console.log('non valid form!!');
    }
  }

}