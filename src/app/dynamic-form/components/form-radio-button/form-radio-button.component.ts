import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-radio-button',
  styleUrls: ['form-radio-button.component.scss'],
  templateUrl: 'form-radio-button.component.html'
})
export class FormRadioButtonComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup;
}
