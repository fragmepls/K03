import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Observer, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from './item';
import { ItemFactory } from './Item-factory';

const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${URL}/api/items/`);
  }
  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${URL}/api/items/${id}`);
  }
  checkIdExists(id: string): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.http.get<Item>(`${URL}/api/items/${id}`).subscribe(
      (response) => subject.next(true),
      (error) => subject.next(false)
    );
    return subject.asObservable();
  }
  createItem(item: Item): Observable<HttpResponse<Item>> {
    return this.http.post<Item>(`${URL}/api/items/`, item, {
      observe: 'response',
      responseType: 'text' as 'json',
    });
  }
  updateItem(id: string,item: Item) {
    return this.http.put<Item>(`${URL}/api/items/${id}`,item, {
      observe: 'response',
      responseType: 'text' as 'json',
    });
  }
  deleteItem(id: string) {
    return this.http.delete<Item>(`${URL}/api/items/${id}`, {
      observe: 'response',
      responseType: 'text' as 'json',
    });
  }
  deleteAllItems(): Observable<any> {
    return this.getAllItems().pipe(
      switchMap((items) => {
        if (items != null && items.length > 0) {
          return forkJoin(items.map((item) => this.deleteItem(item.id)));
        } else {
          return new Observable((obs) => {
            obs.next(null);
            obs.complete();
          });
        }
      })
    );
  }

  createAllItems() {
    let items = ItemFactory.items();
    return this.deleteAllItems().pipe(switchMap(data=>{
      return forkJoin(items.map(item =>{
        return this.createItem(item)
      }))
    }));
  }
}
