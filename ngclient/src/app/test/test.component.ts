import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { increment, decrement, reset } from '../actions/counter.actions'

import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  count$: Observable<number>

  text:string;

 
  ngOnInit() {
  }

  constructor(private store: Store<{ count: number }>, private chatService: ChatService) {
    this.count$ = store.select('count');

    chatService.messages.subscribe(msg => {
      console.log(msg)
    })
  }

  private message = {
    author: 'elopomelo',
    message: 'siema joł'
  }

  sendMessage(){
    console.log("new message from client");
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

}
