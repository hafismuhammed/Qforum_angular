import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from 'src/app/models/listitem.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input('question') item: ListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
