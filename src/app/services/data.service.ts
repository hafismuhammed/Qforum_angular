import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
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

  apiHost = "http://forum.mashuptest.com/api/";

  listQuesions(url: string) {
    return this.http.get(url);
  }

  showQuestion(id: number) {
    const url = `${this.apiHost}/qustion/${id}`;
    return this.http.get(url)
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
}

