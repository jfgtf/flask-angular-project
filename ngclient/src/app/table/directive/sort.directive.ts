import { Directive, Input, Renderer2, ElementRef, HostListener, OnInit } from '@angular/core';
import { Sort } from '../../services/sort';
import { InteractionService } from 'src/app/services/interaction.service';

@Directive({
  selector: '[appSort]'
})
export class SortDirective implements OnInit{

  @Input() appSort: Array<any>;

  constructor(private renderer: Renderer2, private targetElement: ElementRef, private interaction: InteractionService) { }

  @HostListener("click")
  sortData() {

    const sort = new Sort();

    const elem = this.targetElement.nativeElement;

    const order = elem.getAttribute("data-order");

    const type = elem.getAttribute("data-type");

    const property = elem.getAttribute("data-name");

    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
    } else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }
  }

  sortDataChild(s:string) {

    const sort = new Sort();

    const elem = this.targetElement.nativeElement;

    const order = elem.getAttribute("data-order");

    const type = elem.getAttribute("data-type");

    const property = s;

    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
    } else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }
  }

  ngOnInit():void{
    this.interaction.subObservable.subscribe((data) => {

      const sort = new Sort();

      const elem = this.targetElement.nativeElement;
  
      const order = elem.getAttribute("data-order");
  
      const type = elem.getAttribute("data-type");
  
      const property = data;
  
      if (order === "desc") {
        this.appSort.sort(sort.startSort(property, order, type));
        elem.setAttribute("data-order", "asc");
      } else {
        this.appSort.sort(sort.startSort(property, order, type));
        elem.setAttribute("data-order", "desc");
      }
    });
  }
}
