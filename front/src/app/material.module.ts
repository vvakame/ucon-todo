import {
  MdInputModule, MdSidenavModule, MdIconModule, MdToolbarModule, MdButtonModule, MdListModule, MdCardModule,
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MdInputModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdCardModule,
  ],
  exports: [
    MdInputModule,
    MdSidenavModule,
    MdIconModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdCardModule,
  ],
})
export class MaterialModule { }
