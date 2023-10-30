import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:any;

  constructor(private fb:FormBuilder,private service:AuthService,private route:Router,private toaster:ToastrService) { }
  loginForm: FormGroup
  ngOnInit(): void {
    this.user = new User();
    if (this.user.isLoggedIn() && (this.user.getData())) {
     this.route.navigate(['/main/marketAnalysis'])
    }
    this.loginForm = this.fb.group(
      {
        'user_name': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
      }
    )

  }

  Login() {
    let data ={
      'user_name': this.loginForm.controls['user_name'].value,
      'password':this.loginForm.controls['password'].value,
      'type':"A"
    }


    this.service.login(data).subscribe((data) => {
      if (data.status && data.data.user_type_id != 7) {
        this.route.navigate(['/main'])
        const user = new User()
        user.setData(data.data)
        user.setToken(data.data.token.toString())
        // this.toaster.successToastr("Login Succefull !")
      } else {
        this.toaster.error(data.message.toString());
        console.log("Error", data.message)
      }
    })
  }
}
