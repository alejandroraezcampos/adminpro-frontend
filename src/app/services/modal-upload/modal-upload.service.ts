import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public type: string;
  public id: string;
  public hidden: string = 'hidden';

  constructor() { }

  public notification = new EventEmitter<any>();

  hideModal() {
    this.hidden = 'hidden';
    this.type = null;
    this.id = null;
  }

  showModal( type: string, id: string) {
    this.hidden = null;
    this.type = type;
    this.id = id;
  }
}
