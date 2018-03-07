import {Component, OnInit, ViewChild} from '@angular/core';
import {DragDirective} from '../../shared/drag.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @ViewChild(DragDirective) mapDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.mapDirective.moveCenterToCenter();
  }

}
