import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService implements OnInit{

  ngOnInit():void{
    throw new Error("Method not implemented.")
  }

  private sub = new Subject();

  public subObservable = this.sub as Observable<string>;

  sendMessage(message:string){
    this.sub.next(message);
  }

  constructor() { }
}
