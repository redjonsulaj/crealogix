import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material.module";
import {TransformPipe} from "./pipes/transform.pipe";
import {MapperPipe} from "./pipes/mapper.pipe";


@NgModule({
  declarations: [
    TransformPipe,
    MapperPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    TransformPipe,
    MapperPipe
  ]
})
export class SharedModule {
}
