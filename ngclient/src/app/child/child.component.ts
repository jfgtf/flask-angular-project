import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  @Output() public childEvent = new EventEmitter();

  clickedName(){
    this.childEvent.emit('Name');
  }  
  clickedAge(){
    this.childEvent.emit('Age');
  }

  clickedID(){
    this.childEvent.emit('Id');
  }


  ngOnInit(): void {}

}
