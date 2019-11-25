import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

// tslint:disable-next-line: deprecation
  constructor(
               public settingsService: SettingsService
    ) { }

  ngOnInit() {
    this.placeCheck();
  }

  changeTheme(color: string, link: any ) {
    this.applyCheck( link );
    this.settingsService.setTheme(color);
  }

  applyCheck( link: any) {
    let selectors: any = document.getElementsByClassName('selector');
    for ( let ref of selectors ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  placeCheck( ) {
    let theme = this.settingsService.settings.theme;
    let selectors: any = document.getElementsByClassName('selector');
    for ( let ref of selectors ) {
      if ( ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
