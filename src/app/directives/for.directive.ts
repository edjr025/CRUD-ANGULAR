import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  @Input('myForEm') numbers!: number[]; //No Angular 9 não precisava da !(exclamação depois da variavel numbers)

  //@Input('myForUsando') text!: string; 

  constructor() { }



  ngOnInit(): void {
    console.log(this.numbers)
    //console.log(this.text)
  }

}


