import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, SimpleChanges, Type, ViewContainerRef } from "@angular/core";
import { FormInputComponent } from "../dynamic-form/components/form-input/form-input.component";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../dynamic-form/models/field-config.interface";
import { Field } from "../dynamic-form/models/field.interface";
import { FormSelectComponent } from "../dynamic-form/components/form-select/form-select.component";
import { FormRadioButtonComponent } from "../dynamic-form/components/form-radio-button/form-radio-button.component";
import { FormMultiselectDropdownComponent } from "../dynamic-form/components/form-multiselect-dropdown/form-multiselect-dropdown.component";

const components: {[type: string]: Type<Field>} = {
    input: FormInputComponent,
    select: FormSelectComponent,
    radio: FormRadioButtonComponent,
    multichoice: FormMultiselectDropdownComponent
}

@Directive({
    selector: '[dynamicField]',
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
    @Input()
    config!: FieldConfig;

    @Input()
    group!: FormGroup;

    component!: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) {}

    ngOnChanges() {
        if(this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }

    ngOnInit() {
        const componentType = this.chooseFormComponent(this.config.type);

        if( !components[componentType]) {
            const supportedTypes = Object.keys(components).join(', ');
            throw new Error(
                `Trying to use an unsupported type (${componentType}).
                Supported types: ${supportedTypes}`
            );
        }
        const component = this.resolver.resolveComponentFactory<Field>(components[componentType]);
        this.component = this.container.createComponent(component);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }

    chooseFormComponent = (type: string) => {
        type = type.toLowerCase();
        if(type === 'string' && this.config.enum) {
            return 'select';
        } else if (type === 'boolean') {
            return 'radio';
        } else if (type === 'array') {
            return 'multichoice';
        } else {
            return 'input';
        }
    };
}