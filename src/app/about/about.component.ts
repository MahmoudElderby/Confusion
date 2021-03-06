import { Component, OnInit,Inject } from '@angular/core';
import {Leader} from '../shared/leader';
import {CorporateLeadersService} from '../services/corporate-leaders.service';
import {flyInOut,expand} from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[flyInOut(),expand()]
})
export class AboutComponent implements OnInit {

  leaders  : Leader[];
  leaderErrMsg :string;
  constructor(private corporateLeadersService :CorporateLeadersService,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.corporateLeadersService.getAllLeaders()
    .subscribe((leader)=> this.leaders = leader,errmes=> this.leaderErrMsg = errmes);
  }

}
