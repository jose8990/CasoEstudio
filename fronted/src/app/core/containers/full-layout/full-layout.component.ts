import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {BlockUI, NgBlockUI} from "ng-block-ui";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayout implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  constructor(private router: Router) {
    this.blockUI.start();
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    setTimeout(() => {
      this.blockUI.stop();
    }, 500);
  }
}
