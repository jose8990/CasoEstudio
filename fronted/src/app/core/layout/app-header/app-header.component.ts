import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {AuthService} from "../../services";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeader implements OnInit {
  private subscription;

  private user: User;
  public username = 'anon.';

  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  constructor(private authService: AuthService,
              private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/system/login']);
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.username = user ? user.username : '';
    });
  }
}
