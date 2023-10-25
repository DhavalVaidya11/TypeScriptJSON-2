import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { Field } from '../../models/field.interface';
import { IDropdownSettings, ListItem } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-form-multiselect-dropdown',
  templateUrl: './form-multiselect-dropdown.component.html',
  styleUrls: ['./form-multiselect-dropdown.component.scss'],
})
export class FormMultiselectDropdownComponent implements Field{
selectedItems: any;
data !:any;
dropdownSettings!: IDropdownSettings;
onSelectAll($event: ListItem[]) {
throw new Error('Method not implemented.');
}
onItemSelect($event: ListItem) {
throw new Error('Method not implemented.');
}
  config!: FieldConfig;
  group!: FormGroup;

}
