import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators ,RequiredValidator} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
import {flyInOut,visibility,expand} from '../animations/app.animation';
import { FeedbackService } from '../services/feedbackservice.service';
import {delay} from 'rxjs/operators';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    visibility(),expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback :Feedback;
  postedBackFeedback :Feedback;
  isBefore5secs = false;
  errMess :string;
  contactType = ContactType;
  isSubmitted = false;
  showForm = true;
  fromVisibility='shown';
  progressVisibility='hidden';
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  
@ViewChild('fform') feedbackFormDirective;
  constructor(private fb:FormBuilder,private fbService:FeedbackService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm()
  {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit(){
    this.showForm=false;
    this.fromVisibility="hidden";
    this.progressVisibility = "shown";
    this.isSubmitted = true;
    this.feedback = this.feedbackForm.value;
    this.fbService.postFeedback(this.feedback).subscribe(fb=> {
      this.postedBackFeedback = fb;
      this.isSubmitted = false;
      this.progressVisibility = "hidden";
      this.isBefore5secs = true;
      //setTimeout(this.timeOut,5000)  
      setTimeout( ()=>{
        this.isBefore5secs=false;
        this.showForm=true;
        this.fromVisibility="shown";
       }, 5000);  
    },
      errmess=>{
        this.errMess=errmess;
        this.isSubmitted= false;
        this.progressVisibility = "hidden";
        this.showForm=true;
        this.fromVisibility="shown";
      });

    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contacttype:'None',
      message:''
    });
    this.feedbackFormDirective.reset();
    console.log(this.feedback);
    
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
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

}
