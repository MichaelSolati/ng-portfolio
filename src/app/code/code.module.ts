import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CodeRoutingModule } from './code-routing.module';
import { CodeComponent } from './code.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CodeRoutingModule
  ],
  declarations: [CodeComponent]
})
export class CodeModule { }
