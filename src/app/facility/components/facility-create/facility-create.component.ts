import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FacilityConst } from '../../services/facility.constants';

@Component({
    selector: 'facility-create-form',
    templateUrl: './facility-create.component.html',
    styleUrls: ['./facility-create.component.scss']
})
export class FacilityCreateComponent implements OnInit {

    @ViewChild('facilityCreateForm') facilityCreateForm!: NgForm;

    @Input() facilityData?: Object;
    @Input() isUpdate!: boolean;
    @Output() detailsEmit: EventEmitter<any> = new EventEmitter<any>();

    businessUnits: Array<any> = [];
    facilityTypes: Array<any> = [];
    tenantList: Array<any> = [];

    facilityDetails: Object = {};
    isSizeMaxArea: boolean = true;

    constructor(private constant: FacilityConst) {
        this.businessUnits = this.constant.BUSINESS_LIST;
        this.facilityTypes = this.constant.FACILITY_TYPE;
        this.tenantList = this.constant.TENANT_LIST;
    }

    ngOnInit() {
        this.facilityDetails = Object.assign({}, this.facilityData );
        (this.facilityDetails as any)['tenant'] ='delhivery';
        if (this.facilityDetails.hasOwnProperty('facility_attributes')) {
            (this.facilityDetails as any)['facility_attributes'].sort_code = '';
        }

        /**
         * Emit form data if form input value change
         */
        (this.facilityCreateForm as any).valueChanges.subscribe(() => {
            this.formValueEmit();
        })
    }

    /**
   * to select facility type and emit form data
   * @param : event         - Array of facilities object
   * @return                - selected facilty type
   */
    selectFacilityType = (event: any[]) => {
        (this.facilityDetails as any)['facility_type'] = event.map(facility => {
            return facility.val;
        })

        this.formValueEmit();
    };

    selectTenant = (data: any) => {
        (this.facilityDetails as any)['tenant']= data;      
    }

    /**
     * Emit facilty data to create
     */
    formValueEmit = () => {
        const detailsData = {};

        (detailsData as any)['isValid'] = this.facilityCreateForm.valid &&
            (this.facilityDetails as any)['facility_type'] &&
            (this.facilityDetails as any)['facility_type'].length && this.isSizeMaxArea
            ? true : false;

        if ((detailsData as any)['isValid'] && (this.facilityDetails as any)['facility_type'] || (this.facilityDetails as any)['facility_type'].length) {
            (detailsData as any)['details'] = this.facilityDetails;
        }
        this.detailsEmit.emit(detailsData);
    }

     /**
     * @description this function validate area field
     * @param area area is containing value of area field
     */
    areaMaxSizeValidator(area: number){
        if(area > 2000000000){
        this.isSizeMaxArea = false;
    } else {
        this.isSizeMaxArea = true;
        }
    }
}
