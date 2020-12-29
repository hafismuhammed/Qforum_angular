import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  @Input() id: number;
  @Output() close = new EventEmitter();
  @Output() eddited = new EventEmitter();

  questionValue = "";
  titleValue = "";
  questionId: number;

  constructor(private dataServices: DataService) { }

  ngOnInit(): void {
    this.dataServices.showQuestion(this.id).subscribe((res) => {
      this.questionValue = res.question;
      this.titleValue = res.title;
      this.questionId = res.id
    });
  }

  editQuestionSubmit(data) {
    this.dataServices.editQuestion(
      this.questionId, data.title, data.question
    ).subscribe((res) => {
      this.eddited.emit();
    });
  }

  onClose() {
    this.close.emit();
  }

}
