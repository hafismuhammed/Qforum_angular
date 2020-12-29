import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit {

  @Input() answer: string;
  @Input() answerId: number;
  @Output() close = new EventEmitter();
  @Output() eddited = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onEditAnswerSubmit(data) {
    this.dataService.editAnswer(this.answerId, this.answer)
    .subscribe((res) => {
      //console.log(res);
      this.eddited.emit();
    })
  }

  onClose() {
    this.close.emit();
  }

}
