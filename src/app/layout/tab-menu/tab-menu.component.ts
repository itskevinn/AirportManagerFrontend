import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenuService} from 'src/app/data/services/config/menu.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss']
})
export class TabMenuComponent implements OnInit {
  items: MenuItem[] = [];
  subscriptions: Subscription[] = [];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
  }

  private getMenuItems(): void {
    let subscription = this.menuService.getAll().subscribe(r => {
      if (!r.success) {
        return;
      }
      this.items = r.body;
    });
    this.subscriptions.push(subscription);
  }
}
