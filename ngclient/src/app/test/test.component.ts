import { getOpinions, addOpinions } from './../actions/opinion.action';
import { Component, OnInit, NgModule } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { increment, decrement, reset } from '../actions/counter.actions'

import { ChatService } from '../services/chat.service';

import { Opinion } from '../models/Opinion';
import { OpinionState } from '../services/opinion.reducer';
import { AuthService } from './../services/auth.service';

import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ChartsModule, baseColors } from 'ng2-charts';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  opinions: Opinion[] = []; 
  opinions$ = this.store_op2.select('opinions');
  newOpinion: Opinion = new Opinion();
  messages: Message[] = [];
  public message_ : string;
  public author_ : string;

  count$: Observable<number>

  text:string;

  constructor(private store: Store<{ count: number }>, private chatService: ChatService, private store_op: Store, private store_op2: Store<OpinionState>, private auth: AuthService) {
    this.count$ = store.select('count');

    chatService.messages.subscribe(msg => {
      this.messages.push(msg)
    })
  }

  ngOnInit(): void {
    this.getAllOpinions();
  }

  getAllOpinions(): void {
    this.store_op.dispatch(getOpinions());
  }

  addNewMovies(): void {
    this.store.dispatch(addOpinions(this.newOpinion));
    this.getAllOpinions();
    this.newOpinion = new Opinion();
  }

  private message = {
    author: 'test',
    message: 'test'
  }

  sendMessage(){
    this.message.author = this.author_;
    this.message.message = this.message_;
    this.chatService.messages.next(this.message);
  }
 
  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  } 

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#d13537', '#b000b5', '#c0ffee']
    }
  ]

}

interface Message{
  author:string;
  message:string;
}
