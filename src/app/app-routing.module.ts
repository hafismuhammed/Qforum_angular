import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { MyAnswerComponent } from './components/my-answer/my-answer.component';
import { MyQuestionComponent } from './components/my-question/my-question.component';
import { ShowQuestionComponent } from './components/show-question/show-question.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'askquestion', component: AskQuestionComponent},
  {path: 'question/:id', component: ShowQuestionComponent},
  {path: 'myquestion', component: MyQuestionComponent},
  {path: 'myanswer', component: MyAnswerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
