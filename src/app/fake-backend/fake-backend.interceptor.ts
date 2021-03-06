import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { TodoService } from "../services/todo-service/todo.service";

let todos = JSON.parse(localStorage.getItem("todos")) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private todoService: TodoService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return of(null).pipe(handleRoute);

    function handleRoute() {
      switch (true) {
        case url.endsWith("/api/todos") && method === "GET":
          return readData();
        case url.match("/api/edit/*") && method === "GET":
          return readDataById();
        case url.endsWith("/api/todos") && method === "POST":
          return createData();
        case url.endsWith("/api/todos") && method === "PUT":
          return updateData();
        case url.match("/api/delete/*") && method === "DELETE":
          return deleteData();
        default:
          return next.handle(req);
      }
    }

    function readData() {
      return ok(todos.sort((a, b) => (a.date > b.date) ? 1 : -1));
    }

    function readDataById() {
      let todo = todos.filter((todo) => todo.id === idFromUrl());
      return ok(todo);
    }

    function createData() {
      body.id = getSmallestFreeId();
      todos.push(body);
      localStorage.setItem("todos", JSON.stringify(todos));
      return ok();
    }

    function updateData() {
      let todo = todos.filter((item) => item.id === body.id);
      todo[0].description = body.description;
      todo[0].category = body.category;
      todo[0].date = body.date;
      localStorage.setItem("todos", JSON.stringify(todos));
      return ok();
    }

    function deleteData() {
      let id = idFromUrl();
      let filteredTodos = todos.filter((element) => element.id !== id);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return ok();
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function idFromReqBody() {
      return parseInt(body);
    }

    function getSmallestFreeId() {
      let free = false;
      let id = 0;

      while (!free) {
        let filteredTodos = todos.filter((element) => element.id === id);
        if (filteredTodos && filteredTodos.length) {
          id += 1;
        } else {
          return id;
        }
      }
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
