import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnInit {

  editAnswerId: number;
  editAnswerValue: string;
  isLoadding: boolean = false;
  questionId: number;
  questionData: Question;
  isLoggedIn: boolean;
  userSub: Subscription;
  userId: number;
  editQuestion: boolean = false;
  editAnswer: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.userId = user.user.id;
      }
    });
    this.questionId = this.route.snapshot.params['id'];
    this.getQuestion(this.questionId);
  }

  submitAnswer(data, answerForm: NgForm) {
    this.dataService.
    answerQuestion(this.questionId, data.answer)
    .subscribe((res) => {
      this.getQuestion(this.questionId);
      answerForm.resetForm();
    });
    
  }

  getQuestion(id) {
    this.isLoadding = true;
    this.dataService.showQuestion(id).subscribe((res) => {
      this.isLoadding = false;
      this.questionData = res;
    });
    this.editQuestion = false;
    this.editAnswer = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  deleteAnswer(id: number) {
    this.dataService.deleteAnswer(id).subscribe((res) => {
      this.router.navigate(['/']);
    })
  }

  deleteQuestion(id: number) {
    this.dataService.deleteQuestion(id).subscribe((res) => {
      this.router.navigate(['/']);
    })
  }

  showEditQuestionModal() {
    this.editQuestion = !this.editQuestion;
  }

  showEditAnswerModal(answer: string, id: number) {
    this.editAnswer = !this.editAnswer;
    this.editAnswerValue = answer;
    this.editAnswerId = id;
  }
}
