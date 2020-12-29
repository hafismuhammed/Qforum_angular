import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  askQuestion(data) {
    this.dataService.askQuestion(data.title, data.question)
    .subscribe((res) => {
      this.router.navigate(['/']);
    });
  }

}
