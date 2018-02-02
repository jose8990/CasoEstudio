import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html'
})
export class AppFooter implements OnInit {
  today: Date = new Date();

  ngOnInit(): void {
  }
}
