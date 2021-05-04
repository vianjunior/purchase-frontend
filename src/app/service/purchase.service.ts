import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Filter } from '../model/filer.model';

import { Purchase } from '../model/purchase.model'

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  baseUrl = "http://localhost:8081/server/rest";

  constructor(
    private snackBar: MatSnackBar, 
    private http: HttpClient) { }

  create(purchase: Purchase): Observable<any> {
    return this.http.post<Purchase>(`${this.baseUrl}/create`, purchase).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(purchase: Purchase): Observable<any> {
    return this.http.post<Purchase>(`${this.baseUrl}/update`, purchase).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getPendingTasks(filter: Filter): Observable<Purchase[]> {
    return this.http.post<Purchase[]>(`${this.baseUrl}/getPendingTasks`, filter).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getAllTasks(filter: Filter): Observable<Purchase[]> {
    return this.http.post<Purchase[]>(`${this.baseUrl}/getAllTasks`, filter).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  getTaskById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.baseUrl}/getTaskById?id=${id}`).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Não foi possível conectar ao servidor', true);
    return EMPTY;
  }
  
}