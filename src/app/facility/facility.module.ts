import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';

import { FacilityDetailsComponent } from './components/facility-details/facility-details.component';
import { FacilityCreateComponent } from './components/facility-create/facility-create.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form.component';

@NgModule({
  declarations: [
    FacilityDetailsComponent,
    FacilityCreateComponent,
    DynamicFormComponent,
  ],
  imports: [
    BrowserModule,
    NgModule,
    FormsModule,
    ReactiveFormsModule,
    NgModel,
    DynamicFormModule,
  ],
  exports: [
    FacilityDetailsComponent,
    FacilityCreateComponent,
  ]
})
export class FacilityModule { }
