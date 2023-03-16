import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

const URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(private http: HttpClient) { }

  resetStore(): Observable<HttpResponse<Book>> {
    return this.http.delete<Book>(`${URL}/books/`, { observe: 'response', responseType: 'text' as 'json' });
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${URL}/books/`);
  }

  getAllBooksSearchTerm(searchTerm: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${URL}/books/search/${searchTerm}`);
  }

  createBook(book: Book): Observable<HttpResponse<Book>> {
    return this.http.post<Book>(`${URL}/book`, book, { observe: 'response', responseType: 'text' as 'json' });
  }

  deleteBook(isbn: string): Observable<HttpResponse<Book>> {
    return this.http.delete<Book>(`${URL}/book/${isbn}`, { observe: 'response', responseType: 'text' as 'json' });
  }

  getBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${URL}/book/${isbn}`);
  }

  updateBook(book: Book): Observable<HttpResponse<Book>> {
    return this.http.put<Book>(`${URL}/book/${book.isbn}`, book, { observe: 'response', responseType: 'text' as 'json' });
  }

  checkBook(isbn: string): Observable<HttpResponse<Book>> {
    return this.http.get<Book>(`${URL}/book/${isbn}/check`, { observe: 'response', responseType: 'text' as 'json' });
  }

  rateBook(isbn: string, rating: string) {
    return this.http.post<Book>(`${URL}/book/${isbn}/rate`, { rating: rating }, { observe: 'response', responseType: 'text' as 'json' });
  }


}
