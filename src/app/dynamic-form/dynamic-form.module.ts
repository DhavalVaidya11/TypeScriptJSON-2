import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFieldDirective } from '../dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './containers/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormRadioButtonComponent } from './components/form-radio-button/form-radio-button.component';
import { FormMultiselectDropdownComponent } from './components/form-multiselect-dropdown/form-multiselect-dropdown.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioButtonComponent,
    FormMultiselectDropdownComponent,
  ],
  exports: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormInputComponent,
    FormRadioButtonComponent,
    FormSelectComponent,
    FormMultiselectDropdownComponent,
  ],
  
})
export class DynamicFormModule {}
