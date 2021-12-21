import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseUrl = ' http://localhost:3001/Products'

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient
    ) { }

  ShowMessage(msg: string, isErro: boolean = false): void{
     
    this.snackBar.open(msg,'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-error'] :  ['msg-sucess']
    })
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

 

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  readById(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  delete(id: number): Observable<Product>{  //colocar o id para number resolverar os ! (exclamação)
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.erroHandler(e))
    );
  }

  erroHandler(e: any): Observable<any>{
    this.ShowMessage('Ocorreu um erro, tente mais tarde',true);
    return EMPTY
  }
}
