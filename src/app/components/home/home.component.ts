import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/listitem.model';
import { QuestionResponse } from 'src/app/models/questionresponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listQuestions: ListItem[] = [];
  questionResponse: QuestionResponse;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });

    this.dataService.listQuesions('http://forum.mashuptest.com/api/question')
    .subscribe((res: QuestionResponse) => {
      this.listQuestions = res.data;
      this.questionResponse = res;
    });
  }

  searchFormSubmit(data: any) {
    this.dataService.searchQuestion(data.keyword).subscribe(
      (res: QuestionResponse) => {
        this.listQuestions = res.data
      }
    );  
  }

  paginatedResult(page: any) {
    this.dataService.listQuesions(
      `http://forum.mashuptest.com/api/question?page=${page}`
      )
      .subscribe((res: QuestionResponse) => {
        this.listQuestions = res.data;
        this.questionResponse = res;
        console.log(res);
      });
  }

}
