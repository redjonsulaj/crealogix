import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransformPipe} from "./pipes/transform.pipe";

@NgModule({
  declarations: [
    TransformPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TransformPipe
  ]
})
export class SharedModule {
}
