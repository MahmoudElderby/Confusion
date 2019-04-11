import { Component, OnInit,Input,ViewChild, Inject } from '@angular/core';
import {Params, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Dish } from '../shared/dish';
import {DishService} from '../services/dish.service'
import {switchMap} from 'rxjs/operators';
import { observable, Observable } from 'rxjs';
import {FormBuilder,FormGroup,Validators ,RequiredValidator} from '@angular/forms';
import { Comment } from '../shared/Comment';
import { SSL_OP_ALL } from 'constants';
import { stringify } from '@angular/core/src/util';
import {visibility,flyInOut,expand} from '../animations/app.animation';
import { stat } from 'fs';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    visibility(),expand()
  ]
})
export class DishdetailComponent implements OnInit {
  tempComment :Comment;
  comment :Comment;
  dish : Dish;
  dishCopy: Dish;
  dishIds : string[];
  prev:string;
  next:string;
  commentForm : FormGroup;
  errMsg :string;
  visibility='shown';

  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required':      'Auther Name is required.',
      'minlength':     'Auther Name must be at least 2 characters long.',
      'maxlength':     'Auther Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    }
  };
  @ViewChild('fform') commentFormDirective;

  constructor(private dishService:DishService,
    private location:Location,
    private activatedRoute:ActivatedRoute,private fb:FormBuilder,
    @Inject('BaseURL') private baseURL) 
    {
      this.createForm();
     }

  ngOnInit() {

    this.dishService.getDishesIds().subscribe(dishIds => this.dishIds = dishIds);
    
    this.activatedRoute
    .params
    .pipe(switchMap((params: Params) =>{
      this.visibility='hidden'; 
      return this.dishService.getDish(params['id']);
    }))
    .subscribe(dish => { this.dish = dish;this.dishCopy=dish; this.setPrevNext(dish.id);this.visibility='shown' },
    errmess=>this.errMsg = <any>errmess);


    // let id = this.activatedRoute.snapshot.params['id'];

    // this.dishService.getDish(id)
    // .subscribe((dish)=>this.dish = dish);

  }
  createForm()
  {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating:[5],
      comment: ['', Validators.required ]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }

  goBack()
  {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    this.tempComment=this.commentForm.value;
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

onSubmit()
{  
  this.comment = this.commentForm.value;
  this.commentForm.reset({
    author: '',
    rating:5,
    comment: ''
  });
  this.commentFormDirective.reset();

  this.comment.date = Date.now().toString();
  
  console.log (this.comment);
  
  this.dishCopy.comments.push(this.comment);
  this.dishService.putDish(this.dishCopy)
  .subscribe(dish=>{
    this.dish = dish;
    this.dishCopy = dish;
  },errmess=>{
    this.dish = null; this.dishCopy=null;this.errMsg = <any> errmess;
  });
}

}
