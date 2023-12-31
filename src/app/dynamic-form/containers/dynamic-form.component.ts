import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FieldConfig } from "../models/field-config.interface";

const textInputTypeArray = ['integer', 'float', 'time'];
const RegExpRule = {
    integer: '[0-9]*',
    float: '([0-9]{0,15}[.])?[0-9]{0,3}',
    time: '([01]?[0-9]|2[0-3]):[0-5][0-9]',
};

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    styleUrls: ['dynamic-form.component.scss'],
    templateUrl: 'dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnInit {
    @Output()   
    getDynamicFormData: EventEmitter<any> = new EventEmitter<any>();
    
    form!: FormGroup;
    public jsonData: Array<any> = [];
    public config!: any;
    get controls() { return this.config.filter((type: any) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get vlaue() { return this.form.value; }
    typeOfData(data: any) { 
        return data['type'];
    }

    constructor(private fb: FormBuilder ) {
        this.config = {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Name of the facility",
                },
                code: {
                    type: "string",
                },
                allocatedArea: {
                    type: "number",
                },
                active: {
                    type: "boolean"
                },
                tenant: {
                    type: "string",
                    enum: [
                        'Advantis',
                        'Delhivery',
                        'EDesh',
                        'GrameenPhone',
                    ]
                },
                facilitytype: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: [
                            'CollectionPoint',
                            'DispatchCenter',
                        ]
                    },
                }
            },
            required: ["allocatedArea", "name"],
          };
            Object.keys(this.config.properties).forEach((key:any) => {
                let payload;
                debugger
                if(this.config.required.indexOf(key) != -1) {
                    debugger
                    payload = { ...this.config.properties[key], name: key, mandatory: true};
                }
                else {
                    payload = { ...this.config.properties[key], name: key, };
                }
                this.jsonData.push(payload);
            })
        }

    ngOnChanges() {
        if(this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item: { name: any; }) => item.name);
            controls
                .filter((control) => !configControls.includes(control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control: string) => !controls.includes(control))
                .forEach((name: any) => {
                    const config = this.config.find((control: { name: any; }) => control.name === name);
                    this.form.addControl(name, this.createControl(config));
                });
        }
    }
    ngOnInit() {
        
        this.form  = this.createGroup();
        this.handleSubmit();
    }

    createGroup() {
        const group = this.fb.group({});
        Object.keys(this.config.properties).forEach((control: any) => group.addControl(control, this.createControl(this.config.properties[control])));
        return group;
    }

    createControl(config: FieldConfig) {
        const { type, default_value } = config;
        return this.fb.control(
            default_value,
            [
                Validators.pattern(this.validationFunction(type))
            ]
        );
    }

    handleSubmit(event?: Event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.getDynamicFormData.emit(this);
    }

    validationFunction = (type: string) => {
        type = type.toLowerCase();
        if (textInputTypeArray.includes(type)) {
            switch (type) {
                case 'integer': return RegExpRule.integer;
                case 'float': return RegExpRule.float;
                case 'time': return RegExpRule.time;

                default:
                    return '';
            }
        }
        return '';
    }
}