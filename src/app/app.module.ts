import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

import { fakeBackendProvider } from "./fake-backend/fake-backend.interceptor";

import { AppComponent } from "./app.component";
import { NewTodoFormComponent } from "./components/new-todo-form/new-todo-form.component";
import { TodoListViewComponent } from "./components/todo-list-view/todo-list-view.component";
import { EditTodoFormComponent } from "./components/edit-todo-form/edit-todo-form.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "todos", component: TodoListViewComponent },
      { path: "edit/:id", component: EditTodoFormComponent },
      { path: "delete/:id", component: EditTodoFormComponent },
      { path: "new", component: NewTodoFormComponent },
      { path: "", redirectTo: "todos", pathMatch: "full" },
      { path: "**", redirectTo: "todos", pathMatch: "full" },
    ]),
  ],
  declarations: [
    AppComponent,
    NewTodoFormComponent,
    TodoListViewComponent,
    EditTodoFormComponent,
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
