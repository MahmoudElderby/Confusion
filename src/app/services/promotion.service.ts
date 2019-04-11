import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import {baseURL} from '../shared/baseurl';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { resolve } from 'url';
import {delay, map ,catchError} from 'rxjs/operators';
import { of,Observable, } from 'rxjs';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
//import {delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,private processHttpmsgService :ProcessHTTPMsgService) { }

  getPromotions(pri) : Observable< Promotion[]>
  {
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processHttpmsgService.handelError));
    //return of(PROMOTIONS).pipe(delay(2000));
    

    // return new Promise(resolve=>{
    //   setTimeout(() => {
    //     resolve(PROMOTIONS);
    //   }, 2000);
    // });

    //return Promise.resolve(PROMOTIONS);
  }

  getPromotion() :Observable< Promotion> 
  {
    return this.http.get<Promotion>(baseURL + 'promotions')
    .pipe(map(promotion=> promotion[0]))
    .pipe(catchError(this.processHttpmsgService.handelError));
    //return of(PROMOTIONS[0]).pipe(delay(2000));
    // return new Promise(resolve=>{
    //   setTimeout(() => {
    //     resolve(PROMOTIONS[0])
    //   }, 2000);
    // });

    //return PROMOTIONS.filter((promotion)=> (promotion.id===id))[0];
    //return  Promise.resolve(PROMOTIONS[0]);
  }
  getFeaturedPromotion(): Observable<Promotion> {

    return this.http.get<Promotion>(baseURL + 'promotions')
    .pipe(map(promotion=> promotion[0]))
    .pipe(catchError(this.processHttpmsgService.handelError));
    //return of(PROMOTIONS[0]).pipe(delay(2000));

    // return new Promise(resolve=>{
    //   setTimeout(() => {
    //     resolve(PROMOTIONS[0])
    //   }, 2000);
    // });

    //return PROMOTIONS.filter((promotion) =>promotion.featured)[0];
    //return  Promise.resolve(PROMOTIONS[0]);
  }

}
