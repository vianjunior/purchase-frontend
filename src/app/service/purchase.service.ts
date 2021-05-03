import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Purchase } from '../model/purchase.model'

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  baseUrl = " http://localhost:8081/server/rest/";

  constructor(
    private snackBar: MatSnackBar, 
    private http: HttpClient) { }

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

  create(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.baseUrl, purchase).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readApprovalPending(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readAll(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.baseUrl}readAll`).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Purchase> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Purchase>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(purchase: Purchase): Observable<Purchase> {
    const url = `${this.baseUrl}/${purchase.id}`
    return this.http.put<Purchase>(url, purchase).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  
}
