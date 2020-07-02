import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  languages = ['EN', 'PT'];

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {}

  onSelectLanguage(item: string): void {
    this.translate.use(item.toLowerCase());
  }
}
