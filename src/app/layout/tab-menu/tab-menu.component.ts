import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Subscription} from "rxjs";
import {AuthService} from "../../data/services/security/auth.service";

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] = [];
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.items = this.menuItems;
  }

  private get menuItems(): MenuItem[] {
    let items: MenuItem[] = [];
    let backendItems: any[] = [];
    let user = this.authService.currentUserValue;
    user?.roles?.forEach(r => {
      r.authorities?.forEach(a => {
        backendItems.push(a);
      });
    });
    backendItems.sort((a, b) => (a.order < b.order) ? -1 : 1);
    backendItems.map(r => {
      items.push(r);
    });
    return items;
  }
}
