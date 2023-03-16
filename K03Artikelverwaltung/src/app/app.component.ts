import { ItemService } from './shared/item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from './shared/item';
import { Router } from '@angular/router';

@Component({
  selector: 'av-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  title = 'Angular2Artikelverwaltung';
}
