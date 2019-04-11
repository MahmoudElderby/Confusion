import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/Dish';
import {DishService} from '../services/dish.service';

import {Promotion} from '../shared/promotion' ;
import {PromotionService} from '../services/promotion.service';

import {Leader} from '../shared/leader';
import {CorporateLeadersService} from '../services/corporate-leaders.service';
import {flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[flyInOut(),expand()]
})
export class HomeComponent implements OnInit {

  featuredDish : Dish;
  dishErrMess : string;
  featuredPromotion :Promotion;
  promotionErrMess : string;
  featuredLeader: Leader;
  leaderErrMess : string;
  constructor(private dishService :DishService, private promotionService:PromotionService , private corporateLeadersService : CorporateLeadersService,
    @Inject('BaseURL') private baseURL)      
     { 
       
     }

  ngOnInit() {
    this.dishService.getFeaturedDish()
    .subscribe((dish)=>this.featuredDish=dish,errMes=>this.dishErrMess=<any>errMes);
  

    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion)=>this.featuredPromotion = promotion,errmess=>this.promotionErrMess=<any>errmess);


    this.corporateLeadersService.getFeaturedLeader()
    .subscribe((leader)=>this.featuredLeader = leader,errMes=>this.leaderErrMess=<any>errMes);

  }

}
