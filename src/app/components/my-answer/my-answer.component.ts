import { Component, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/listitem.model';
import { QuestionResponse } from 'src/app/models/questionresponse.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my-answer',
  templateUrl: './my-answer.component.html',
  styleUrls: ['./my-answer.component.css']
})
export class MyAnswerComponent implements OnInit {

  listQuestions: ListItem[] = [];
  isLoggedIn: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.listAnsweredQuestions(
      'http://forum.mashuptest.com/api/question/answered-by-me'
    )
    .subscribe((res: QuestionResponse) => {
      this.listQuestions = res.data;
    });
  }

}
