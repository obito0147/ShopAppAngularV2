import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/dto/register.dto';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm! : NgForm;
  //khai báo các biến tương ứng với các trường dữ liệu trong form
  phone: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(private http: HttpClient, private router: Router, private userService: UserService){
    this.phone = '';
    this.password='';
    this.retypePassword='';
    this.fullName='';
    this.address='';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }
  onPhoneChange(){
    console.log(`Phone typed: ${this.phone}`);
  }
  register(){
    const message = `phone: ${this.phone} + 
                    password: ${this.password} + 
                    retypePassword: ${this.retypePassword} + 
                    fullName: ${this.fullName} + 
                    address: ${this.address} +
                    isAccepted: ${this.isAccepted}+
                    dateOfBirth: ${this.dateOfBirth}`
    //alert(message);
    const apiUrl = "http://localhost:8084/api/v1/users/register";
    const registerData : RegisterDTO= {
      "fullname": this.fullName,
    "phone_number": this.phone,
    "address": this.address,
    "password": this.password,
    "retype_password": this.retypePassword,
    "date_of_birth": this.dateOfBirth,
    "facebook_account_id": 0,
    "google_account_id": 0,
    "role_id": 1
    }
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.userService.register(registerData).subscribe({
         next:(response: any) => {
         debugger
         this.router.navigate(['/login']);
         console.log(response)
       },
       complete: () => {
         debugger
       },
       error: (error : any) => {
         debugger
         console.error("Đăng ký không thành công: ", error);
       }
    }) 
  }
  //how to chekc password match ?
  checkPasswordMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch': true});
    }else{
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
  checkAge(){
    if(this.dateOfBirth){
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
        age--;
      }
      if(age < 18){
        this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge':true});
      }else{
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
 
  }
}