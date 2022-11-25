import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material.module";
import {TransformPipe} from "./pipes/transform.pipe";


@NgModule({
  declarations: [
    TransformPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    TransformPipe
  ]
})
export class SharedModule {
}
