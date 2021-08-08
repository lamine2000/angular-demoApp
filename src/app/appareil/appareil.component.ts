import { Component, Input, OnInit } from '@angular/core';
import {AppareilService} from "../services/appareil.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName?: string;
  @Input() appareilStatus?: string;
  @Input() appareilIndex?:any;
  @Input() id?: number;
  appareilSubscription?: Subscription;
  appareil?: any;
  buttonText = "";

  constructor(private appareilService: AppareilService) {}

  ngOnInit(): void {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareil = appareils[this.appareilIndex];
      }
    );
    this.appareilService.emitAppareilSubject();

    if(this.appareil.status === 'allumé')
      this.buttonText = "Éteindre";
    else
      this.buttonText = "Allumer";
  }

  getColor(): string{
    if(this.appareilStatus === 'éteint')
      return 'red';
    return 'green';
  }

  switchOne(){
    this.appareilService.switchOne(this.appareilIndex);
    this.changeBtnText();
  }

  changeBtnText(){
    if(this.buttonText === 'Allumer')
      this.buttonText = 'Éteindre';
    else
      this.buttonText = 'Allumer';
  }

}
