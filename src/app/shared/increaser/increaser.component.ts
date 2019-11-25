import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.sass']
})
export class IncreaserComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() progress: number = 50;
  // tslint:disable-next-line:no-input-rename
  @Input('name') legend: string = 'Leyenda';
    // tslint:disable-next-line:no-output-rename
  @Output('updateValue') changeValue: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  changeValuee( value ) {
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
      return;
    }
    if ( this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }
    this.txtProgress.nativeElement.focus();
    this.progress += value;
    this.changeValue.emit(this.progress);
  }

  onChange(newValue: number ) {

    if ( newValue >= 100 ) {
      this.progress = 100;
    } else if ( newValue <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.txtProgress.nativeElement.value = this.progress;
    this.changeValue.emit(this.progress);
  }

}
