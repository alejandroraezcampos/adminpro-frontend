import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styles: []
})
export class GraphicComponent implements OnInit {
  @Input() chartData = [];
  @Input() chartLabels = [];
  @Input() chartType = '';
  constructor() { }

  ngOnInit() {
  }

}
