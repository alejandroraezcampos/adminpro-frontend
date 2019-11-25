import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NopagefoundComponent implements OnInit {
  date: Date;
  constructor() {
    this.date = new Date();
  }

  ngOnInit() {
    init_plugins();
  }

}
