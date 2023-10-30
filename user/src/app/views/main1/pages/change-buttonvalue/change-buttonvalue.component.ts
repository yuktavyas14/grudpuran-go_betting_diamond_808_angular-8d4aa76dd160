import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatchService } from 'src/app/core/services/match.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-buttonvalue',
  templateUrl: './change-buttonvalue.component.html',
  styleUrls: ['./change-buttonvalue.component.scss']
})
export class ChangeButtonvalueComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:MatchService,private toaster:ToastrService) { }
  updateForm: FormGroup
  ngOnInit(): void {
  this.updateForm = this.fb.group(
    {
      value : this.fb.array([])
    }
  )
  this.getButtonValue();
  }

  getButtonValue(){
    this.service.getbuttonValue().subscribe((res)=>{
      if(res?.status){
        let arr = res?.data;
        for(let i = 0; i< arr.length; i++){
          this.addValue(arr[i])
        }
      }
    })
  }

  
  get value() { return this.updateForm.get('value') as FormArray }

  addValue(data) {
    this.value.push(this.fb.group({
      "button_value": data?.button_value,
      "button_name": data?.button_name
    }
    ));
  }

  setButtonValue(){
    this.service.setbuttonValue(this.updateForm.value?.value).subscribe((res)=>{
      if(res?.status){
        this.toaster.success(res?.message);
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
}
