import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'censorship'
})
export class CensorshipPipe implements PipeTransform {

  length4 = ["fuck", "dick"];
  length5 = ["idiot"];
  length6 = ["wanker"];
  length7 = ["bastard"];
  strLowerCased:string;

  transform(value: any, ...args: any): any {
    this.strLowerCased = value.toLowerCase(); 
    console.log(this.length4.includes(this.strLowerCased));
    if (this.length4.includes(this.strLowerCased)){
      return "****"
    }
    if (this.length5.includes(this.strLowerCased)){
      return "*****"
    }
    if (this.length6.includes(this.strLowerCased)){
      return "******"
    }
    if (this.length7.includes(this.strLowerCased)){
      return "*******"
    }
    return value;
  }

}
