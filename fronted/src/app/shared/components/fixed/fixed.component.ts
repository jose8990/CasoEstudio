import {Component, HostListener, Inject, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {Scrolling} from "../../models";

@Component({
  selector: 'fixed',
  templateUrl: './fixed.component.html',
  styleUrls: ['./fixed.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class Fixed implements OnInit {
  @Input() public scroll: Scrolling;
  public fixed: boolean;
  public scrollTop: number;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.fixed = false;
  }

  @HostListener("window:scroll", [])
  @HostListener("window:resize", [])
  onWindowScroll() {
    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (this.scroll) {
      if (this.scroll.min && this.scroll.max) {
        if (this.scrollTop > this.scroll.min && this.scrollTop < this.scroll.max) {
          this.fixed = true;
        } else {
          this.fixed = false;
        }
      } else {
        if (this.scroll.min) {
          if (this.scrollTop > this.scroll.min) {
            this.fixed = true;
          } else {
            this.fixed = false;
          }
        }
        if (this.scroll.max) {
          if (this.scrollTop < this.scroll.max) {
            this.fixed = true;
          } else {
            this.fixed = false;
          }
        }
      }
    }
  }
}
