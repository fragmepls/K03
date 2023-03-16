import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'k3-book-store-service-test',
  templateUrl: './book-store-service-test.component.html',
  styleUrls: ['./book-store-service-test.component.scss'],
})
export class BookStoreServiceTestComponent implements OnInit {
  book: Book | null = null;
  books: Array<Book> = [];
  error: HttpErrorResponse | null = null;
  response: HttpResponse<Book> | null = null;
  constructor(private bs: BookStoreService) { }

  getBook(isbn: string) {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.getBook(isbn).subscribe(
      (response) => { this.books[0] = response;},
      (error) => (this.error = error)
    );
  }

  deleteBook(isbn: string) {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.deleteBook(isbn).subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }

  resetStore() {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.resetStore().subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }

  getAllBooks() {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.getAllBooks().subscribe(
      (response) => { this.books = response },
      (error) => (this.error = error)
    );
  }

  getAllBooksSearchTerm(searchTerm: string) {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.getAllBooksSearchTerm(searchTerm).subscribe(
      (response) => { this.books = response },
      (error) => (this.error = error)
    );
  }

  createBook() {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.book = BookFactory.random();
    this.bs.createBook(this.book!).subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }

  createBookWithISBN() {
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.createBook(this.book!).subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }

  updateBook(isbn: string) {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    let book = BookFactory.random();
    book.isbn = isbn;
    this.bs.updateBook(book).subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }

  checkBook(isbn: string) {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.checkBook(isbn).subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }

  rateBook(isbn: string, rating: string) {
    this.book = null;
    this.books = [];
    this.error = null;
    this.response = null;
    this.bs.rateBook(isbn, rating).subscribe(
      response => this.response = response,
      error => this.error = error
    );
  }


  ngOnInit(): void { }
}
