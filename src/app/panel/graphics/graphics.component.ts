import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styles: []
})
export class GraphicsComponent implements OnInit {
  graphics: any = [
    {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'legend': 'El pan se come con'
    },
    {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'legend': 'Entrevistados'
    },
    {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'legend': '¿Le dan gases los frijoles?'
    },
    {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'legend': '¿Le importa que le den gases?'
    },
    ];
  constructor() { }

  ngOnInit() {
  }

}
