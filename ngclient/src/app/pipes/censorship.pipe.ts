import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'censorship'
})
export class CensorshipPipe implements PipeTransform {

  bad = ["fuck", "dick", "idiot", "wanker", "bastard"];


  transform(value: any, ...args: any): any {
    let strLowerCased = value.toLowerCase(); 
    let splitted: string[]  = strLowerCased.split(" "); 
    let censored: string = '';
    for (let i in splitted){
      for (let j in this.bad){
        if (splitted[i].includes(this.bad[j])){
          splitted[i] = "****";
        }
      }
      censored += splitted[i] + " ";
    }
    return censored;
  }

}
