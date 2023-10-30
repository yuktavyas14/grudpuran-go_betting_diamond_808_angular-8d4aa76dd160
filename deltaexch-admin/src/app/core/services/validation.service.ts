import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { 
    
  }
  noWhitespaceValidator1(control: FormControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }
   notAllowedSpaceValidator(control: FormControl) {
    let userInput = control.value;
    console.log(userInput);
    
    if (userInput && userInput.length > 0) {
      if (userInput[0] === " ") {
        return {
          forbiddenSpace: {
            value: userInput,
          },
        };
      }
      else{
        return  null;
      }
    } else {
      return null;
    }
  }
  
}
