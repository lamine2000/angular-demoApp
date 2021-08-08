import { Component, OnInit } from '@angular/core';
import {AppareilService} from "../services/appareil.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})
export class AppareilViewComponent implements OnInit {
  isAtuth = true;
  appareils? : any[];
  appareilSubscription?: Subscription;
  buttonText = 'Tout Allumer';

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  switchAll (){
    this.appareilService.switchAll();
    this.changeBtnText();
  }

  changeBtnText(){
    if(this.buttonText === 'Tout Allumer') {
      this.buttonText = 'Tout Éteindre';
    }
    else
      this.buttonText = 'Tout Allumer';
  }

}
