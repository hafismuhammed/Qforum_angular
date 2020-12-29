import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { QuestionResponse } from '../models/questionresponse.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  apiHost = 'http://forum.mashuptest.com/api';

  listQuesions(url: string) {
    return this.http.get<QuestionResponse>(url);
  }

  showQuestion(id: number) {
    const url = `${this.apiHost}/question/${id}`;
    return this.http.get<Question>(url);
  }

  searchQuestion(keyword: string): Observable<any> {
    const url = `${this.apiHost}/question/search?keyword=${keyword}`;
    return this.http.get<any>(url).pipe(
      map((response: { result: QuestionResponse }) => {
        let questions: QuestionResponse = response.result;
        console.log(questions);
        return questions;
      })
    );
  }

  askQuestion(title: string, question: string) {
    const url = `${this.apiHost}/question`;
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set('title', title).set('question', question);
        return this.http.post(url, body, { headers: headers });
      })
    );
  }

  editQuestion(questionId: number, title: string, question:string) {
    const url = `${this.apiHost}/question/${questionId}`;
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set('title', title).set('question', question);
        return this.http.put(url, body, { headers: headers });
      })
    );
  }

  deleteQuestion(questionId: number) {
    const url = `${this.apiHost}/question/${questionId}`;
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.delete(url, { headers: headers });
      })
    );
  }

  myQuestion(url: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.get<any>(url, { headers: headers });
      }),
      map((res: { questions: QuestionResponse }) =>{
        let question: QuestionResponse = res.questions;
        console.log(question);
        return question;
      })
    );

  }

  answerQuestion(questionId: number, answer: string) {
    const url = `${this.apiHost}/question/${questionId}/answer`;
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set('answer', answer);
        return this.http.post(url, body, { headers: headers });
      })
    );
  }

  listAnsweredQuestions(url: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.get<any>(url, { headers: headers });
      }),
      map((res: { questions: QuestionResponse }) =>{
        let question: QuestionResponse = res.questions;
        console.log(question);
        return question;
      })
    );
  }

  editAnswer(answerId: number, answer: string) {
    const url = `${this.apiHost}/answer/${answerId}`;
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set('answer', answer);
        return this.http.put(url, body, { headers: headers });
      })
    );
  }

  deleteAnswer(answerId: number) {
    const url = `${this.apiHost}/answer/${answerId}`;
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.delete(url, { headers: headers });
      })
    );
  }
}



