import { Component, OnInit, inject, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import {DishService} from '../services/dish.service';
import { Observable } from 'rxjs';
import {flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[flyInOut(),expand()]
})
export class MenuComponent implements OnInit {
  dishes : Dish[] ;
  errMsg :string;
  selectedDish :Dish;
   
  constructor(private dishService: DishService,
    @Inject('BaseURL') private baseURL) 
  {
    //this.dishes = this.dishService.getDishes();
  }

  onSelect(dish : Dish)
  {
    this.selectedDish = dish;
  }

  ngOnInit() {
  this.dishService.getDishes()
  .subscribe((dishes)=> this.dishes = dishes,
  errmess=>this.errMsg=<any>errmess);
  }

}
