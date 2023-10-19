import { Component } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
    config!: FieldConfig;
    group!: FormGroup;
}
