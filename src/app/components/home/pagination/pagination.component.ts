import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { EventEmitter } from 'events';
import { QuestionResponse } from 'src/app/models/questionresponse.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() questionResponse: QuestionResponse;
  @Output() pageNumberEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  generateArray(n: number): number[] {
    return [...Array(n).keys()];
  }

  pageChangeHandler(pageNum) {
    this.pageNumberEmitter.emit(pageNum);
    console.log(pageNum);
  }


}
