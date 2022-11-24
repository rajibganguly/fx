import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IPrice } from './model/price.model';

import { environment } from './../environments/environment';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // setup database to run - "npm run server"
  private database = environment.database;
  constructor(private httpClient: HttpClient) {}


  /*
  * @description: to handle error
  */
  private handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) {
      console.error('client side', errorResponse.error.message)
    } else {
      console.error('server side', errorResponse)
    }
    return throwError('There is something is wrong');
  }

  /*
  * @description: get all price lists
  */
  getAllPrices(): Observable<IPrice[]> {
    return this.httpClient.get<IPrice[]>(this.database);
  }

  /*
  * @description: get price by id
  */
  getLatestPrice(id: number ): Observable<IPrice> {
    return this.httpClient.get<IPrice>(`${this.database}/${id}`)
    .pipe(catchError(this.handleError));
  }

}
