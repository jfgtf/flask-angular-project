import { SortDirective } from './directive/sort.directive';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Sort } from '../services/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private targetElement: ElementRef) { }

  @ViewChild(SortDirective) myDirective: SortDirective;

  public toSort:string;

  ngOnInit(): void {}
  
  public dataList: Array<IEmployee> = [
    {
      Id: 101,
      Name: 'Magda Gessler',
      Age: 23,
    }, {
      Id: 102,
      Name: 'Wojciech Modest Amaro',
      Age: 1000,
    },
    {
      Id: 103,
      Name: 'Robert Makłowicz(szefito)',
      Age: 25,
    }
  ]

  receive($event:any){
    this.myDirective.sortDataChild($event);
  }
}

export interface IEmployee {

  Id: number;
  Name: string;
  Age: number;
}