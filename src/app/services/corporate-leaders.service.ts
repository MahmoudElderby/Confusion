import { Component ,Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { resolve } from 'url';
import { of ,Observable} from 'rxjs';
import { delay ,map, catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class CorporateLeadersService {

  constructor(private http:HttpClient,
    private processHttpmsgService:ProcessHTTPMsgService) { }

  getLeader (id:string) :Observable<Leader>
  {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHttpmsgService.handelError));
    //return of(LEADERS.filter((leader)=>(leader.id === id))[0]).pipe(delay(2000));

    // return new Promise(resolve=>{
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leader)=>(leader.id === id))[0]);
    //   }, 2000);  
    // });

    //return Promise.resolve(LEADERS.filter((leader)=>(leader.id === id))[0]);
  }

  getAllLeaders() :Observable< Leader[]>
  {
    return this.http.get<Leader[]>(baseURL + "leadership")
    .pipe(catchError(this.processHttpmsgService.handelError));
    //return of(LEADERS).pipe(delay(2000));
    // return new Promise(resolve=>{
    //   setTimeout(() => {
    //     resolve(LEADERS);
    //   }, 2000);

    // });

    //return Promise.resolve(LEADERS);
  }

  getFeaturedLeader() : Observable<Leader>
  {
    return this.http.get<Leader>(baseURL + "leadership")
    .pipe(map(leaders=> leaders[0]))
    .pipe(catchError(this.processHttpmsgService.handelError));
    //return of(LEADERS.filter((Leader) => (Leader.featured))[0]).pipe(delay(2000));

    // return new Promise(resolve=>{
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((Leader) => (Leader.featured))[0]);
    //   }, 2000);
    // })
    //return Promise.resolve(LEADERS.filter((Leader) => (Leader.featured))[0]);
  }

}
