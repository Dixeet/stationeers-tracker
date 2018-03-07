import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    GridComponent
  ],
  exports: [
    GridComponent
  ]
})
export class OreMapModule { }
