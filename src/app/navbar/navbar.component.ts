import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  seconds: number = 0;
  counterSubscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    const counter = Observable.interval(1000);

    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.seconds = value;
      }
    );
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.counterSubscription.unsubscribe();
  }

}
