import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/listitem.model';
import { QuestionResponse } from 'src/app/models/questionresponse.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my-question',
  templateUrl: './my-question.component.html',
  styleUrls: ['./my-question.component.css']
})
export class MyQuestionComponent implements OnInit {

  listQuestions: ListItem[] = [];
  questionResponse: QuestionResponse;
  isLoggedIn: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.myQuestion('http://forum.mashuptest.com/api/question/my-questions')
    .subscribe((res: QuestionResponse) => {
      this.listQuestions = res.data;
      this.questionResponse = res;
    });
  }

  paginatedResult(page: number) {
    this.dataService.listQuesions(
      'http://forum.mashuptest.com/api/question/my-questions?page=' + page
      )
      .subscribe((res: QuestionResponse) => {
        this.listQuestions = res.data;
        this.questionResponse = res;
      });
  }

}
