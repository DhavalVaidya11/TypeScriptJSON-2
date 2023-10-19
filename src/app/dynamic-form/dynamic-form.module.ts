import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from '../dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent
  ],
  exports: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormInputComponent,
  ]
  
})
export class DynamicFormModule {}
