import { getOpinions, addOpinions } from './../actions/opinion.action';
import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { increment, decrement, reset } from '../actions/counter.actions'

import { ChatService } from '../services/chat.service';

import { Opinion } from '../models/Opinion';
import { OpinionState } from '../services/opinion.reducer';
import { AuthService } from './../services/auth.service';

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

}

interface Message{
  author:string;
  message:string;
}
