import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Todo } from '../../data/todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = "./api/todos"

  constructor(private http: HttpClient) { }

  getTodos() : Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      catchError(this.handleError)
    );
  }
  
  getTodoById(id) : Observable<Todo> {
    return this.http.get<Todo>(`./api/edit/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  addTodo(todo : Todo) {
    return this.http.post(this.todoUrl, todo).pipe(
      catchError(this.handleError)
    );
  }

  updateTodo(updateTodo : Todo) {
    return this.http.put(this.todoUrl, updateTodo).pipe(
      catchError(this.handleError)
    );;
  }

  deleteTodo(todoId : number) {
    return this.http.delete(`./api/delete/${todoId}`).pipe(
      catchError(this.handleError)
    );;
  }

  handleError(err : HttpErrorResponse) {
    return throwError(err);
  }
}