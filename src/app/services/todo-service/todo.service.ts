import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = "./api/todos"

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(this.todoUrl).pipe(
      catchError(this.handleError)
    );
  }
  
  getTodoById(id) {
    return this.http.get(`./api/edit/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  addTodo(todo) {
    return this.http.post(this.todoUrl, todo).pipe(
      catchError(this.handleError)
    );
  }

  updateTodo(updateTodo) {
    return this.http.put(this.todoUrl, updateTodo).pipe(
      catchError(this.handleError)
    );;
  }

  deleteTodo(todoId) {
    return this.http.delete(`./api/delete/${todoId}`).pipe(
      catchError(this.handleError)
    );;
  }

  handleError(err : HttpErrorResponse) {
    return throwError(err);
  }
}