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
          return getData();
        case url.match("/api/edit/*") && method === "GET":
          return getDataById();
        case url.endsWith("/api/todos") && method === "POST":
          return postData();
        case url.endsWith("/api/todos") && method === "PUT":
          return updateData();
        case url.match("/api/delete/*") && method === "DELETE":
          return deleteData();
        default:
          return next.handle(req);
      }
    }

    function getData() {
      //console.log(getSmallestFreeId());
      return ok(todos);
    }

    function getDataById() {
      let todo = todos.filter((todo) => todo.id === idFromUrl());
      return ok(todo);
    }

    function postData() {
      body.id = todos.length; //getSmallestFreeId();
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
      console.log("something deleted...");
      return ok();
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function idFromReqBody() {
      console.log("body: ", body);
      return parseInt(body);
    }

    function getSmallestFreeId() {
      let free = false;
      let id = 0;

      while (!free) {
        let filteredTodos = todos.filter((element) => element.id === id);
        if (filteredTodos && filteredTodos.length) {
          id += 1;
          return id;
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
