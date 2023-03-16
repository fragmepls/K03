import { ItemService } from './../shared/item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';

@Component({
  selector: 'av-artikel-list',
  templateUrl: './artikel-list.component.html',
  styleUrls: ['./artikel-list.component.scss']
})
export class ArtikelListComponent implements OnInit {

  items! : Array<Item>;

  constructor(private is : ItemService) { }

  ngOnInit(): void {
    this.is.getAllItems().subscribe(res => this.items = res);
  }

}
