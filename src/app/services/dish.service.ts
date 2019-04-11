import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';

//import {DISHES} from '../shared/dishes';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';

import { promise } from 'protractor';
import { resolve } from 'path';
import { resolveTimingValue } from '@angular/animations/browser/src/util';
import {of,observable, Observable} from 'rxjs';
import {delay, map ,catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,
     private processHTTPMsgService:ProcessHTTPMsgService) { }

getDishes ():Observable<Dish[]>{

  return this.http.get<Dish[]>(baseURL+'dishes')
  .pipe(catchError(this.processHTTPMsgService.handelError));
  //return of(DISHES).pipe(delay(2000));
  
  // return new Promise(resolve=>{
  //   setTimeout(()=>resolve(DISHES),2000);
  // });

}

getDish (id : string):Observable <Dish> {

  return this.http.get<Dish>(baseURL + 'dishes/' + id)
  .pipe(catchError(this.processHTTPMsgService.handelError));

  //return of(DISHES.filter((dish)=> (dish.id ===id))[0]).pipe(delay(2000));
  
  //return of(DISHES).pipe(delay(2000)).toPromise();

  // return new Promise(resolve=>{
  //   setTimeout(() => {
  //     resolve(DISHES.filter((dish)=> (dish.id ===id))[0])
  //   }, 2000);
  // });

  //return Promise.resolve (DISHES.filter((dish)=> (dish.id ===id))[0]);
}

getFeaturedDish() :Observable<Dish> {
  
  return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
  .pipe(map(dishes=>dishes[0]))
  .pipe(catchError(this.processHTTPMsgService.handelError));
  //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  
  // return new Promise(resolve=>{
  //   setTimeout(() => {
  //     resolve(DISHES.filter((dish) => dish.featured)[0])
  //   }, 2000);
  // });

  //return Promise.resolve (DISHES.filter((dish) => dish.featured)[0]);
}

getDishesIds():Observable<string[]|any>
{
  return this.http.get<Dish[]>(baseURL + 'dishes')
  .pipe(map(dishes=> dishes.map(dish=>dish.id)))
  .pipe(catchError(error => error));
  //return of(DISHES.map((dish)=> dish.id));
}

putDish(dish: Dish) : Observable<Dish>
{
  const httpOptions = {
    headers:new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id ,dish ,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handelError));
}


}
