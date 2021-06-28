import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-profile',
  templateUrl: './your-profile.component.html',
  styleUrls: ['./your-profile.component.css']
})
export class YourProfileComponent implements OnInit {

  constructor() { }
  
  onSubmit(event: any) {
    console.log(event.target.player.value)
  }

  ngOnInit(): void {
  }

}