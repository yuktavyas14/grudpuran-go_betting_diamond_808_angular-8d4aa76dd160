import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/core/services/match.service';

@Component({
  selector: 'app-set-buttonval',
  templateUrl: './set-buttonval.component.html',
  styleUrls: ['./set-buttonval.component.scss']
})
export class SetButtonvalComponent implements OnInit {
  updateForm : FormGroup
  constructor(private fb:FormBuilder,private service:MatchService,private toaster:ToastrService) {
    this.updateForm = this.fb.group(
      {
        value1 : this.fb.array([])
      }
    )
   }
  ngOnInit(): void {
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

  get value1()  : FormArray { 
    return this.updateForm.get('value1') as FormArray
    // return this.updateForm.controls["value"] as FormArray;
  }

  // get skills() : FormArray {
  //   return this.skillsForm.get("skills") as FormArray
  // }
  addValue(data: any) {
    this.value1.push(this.fb.group({
      "button_value": data?.button_value,
      "button_name": data?.button_name
    }
    ));
  }

  setButtonValue(){
    this.service.setbuttonValue(this.updateForm.value?.value1).subscribe((res)=>{
      if(res?.status){
        this.toaster.success(res?.message);
      }else{
        this.toaster.error(res?.message);
      }
    })
  }
}

