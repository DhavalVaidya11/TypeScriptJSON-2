export interface FieldConfig {
    id?: string,
    name: string,
    rank: number,
    type: string,
    default_value: any,
    mandatory: boolean,
    business_unit: string,
    options: Array<any>,
    facility_type: Array<any>,
    description: string,
    group_name: string,
    enum: Array<any>,
    items: any;
}