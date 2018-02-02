import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errorStatus: string;
  errorTitle: string;
  errorData: string;

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem('message-badRequest')) {
      this.errorStatus = localStorage.getItem('error-status');
      this.errorTitle = localStorage.getItem('message-badRequest');
      this.errorData = localStorage.getItem('error-data');
    }
  }
}
