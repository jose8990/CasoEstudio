import {Component, OnInit} from "@angular/core";
import {Location as LocationBackButton} from "@angular/common";
import {ActivatedRoute, Event, Router} from "@angular/router";

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  backActive: boolean;
  returnUrl: string;

  constructor(private router: Router,
              private location: LocationBackButton,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams.returnUrl) {
        this.returnUrl = queryParams.returnUrl;
        this.backActive = true;
      }
    });

    this.router.events.subscribe((event: Event) => {
      if (this.backActive && this.returnUrl && this.router.url === this.returnUrl) {
        this.backActive = false;
        this.returnUrl = null;
      }
    });
  }

  ngOnInit(): void {
    this.backActive = false;
  }

  back(): void {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.location.back();
    }
    this.backActive = false;
    this.returnUrl = null;
  }
}

