import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';


@Component({
  selector: 'av-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  error: HttpErrorResponse | null = null;
  response: HttpResponse<Item>[] | null = null;

  constructor(
    private is: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let item: Item = history.state as Item;
    let param = this.route.snapshot.params.param;
    if (param == 'recreateAll') {
      this.is.createAllItems().subscribe(
        () => {
          this.router.navigate(['/artikelList'])
        },
        (error) => (this.error = error)
      );
    } else if (param == 'deleteAll') {
      this.is.deleteAllItems().subscribe(
        () => this.router.navigate(['/artikelList']),
        (error) => (this.error = error)
      );
    } else if (param == 'delete') {
      this.is.deleteItem(this.route.snapshot.params.id).subscribe(
        () => this.router.navigate(['/artikelList']),
        (error) => (this.error = error)
      );
    } else if (param == 'create') {
        this.is.createItem(item).subscribe(
          () => this.router.navigate(['/artikelList']),
          (error) => (this.error = error)
        )
    } else if (param == 'update') {
      this.is.updateItem(this.route.snapshot.params.id, item).subscribe(
        () => this.router.navigate(['/artikelList']),
        (error) => (this.error = error)
      );
    }
  }
}
