import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { ListItemComponent } from './components/home/list-item/list-item.component';
import { PaginationComponent } from './components/home/pagination/pagination.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { ShowQuestionComponent } from './components/show-question/show-question.component';
import { MyQuestionComponent } from './components/my-question/my-question.component';
import { MyAnswerComponent } from './components/my-answer/my-answer.component';
import { EditQuestionComponent } from './components/show-question/edit-question/edit-question.component';
import { EditAnswerComponent } from './components/show-question/edit-answer/edit-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ListItemComponent,
    PaginationComponent,
    AskQuestionComponent,
    ShowQuestionComponent,
    MyQuestionComponent,
    MyAnswerComponent,
    EditQuestionComponent,
    EditAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
