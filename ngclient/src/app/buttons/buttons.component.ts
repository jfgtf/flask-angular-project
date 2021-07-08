import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  constructor(private interaction: InteractionService) { }

  clickedName(){
    this.interaction.sendMessage('Name')
  }  
  clickedAge(){
    this.interaction.sendMessage('Age')
  }

  clickedID(){
    this.interaction.sendMessage('Id')
  }

  ngOnInit(): void {

  }

}
