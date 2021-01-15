import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {HttpHelperService} from '../http-helper.service';
import {NotificationserviceService} from '../notificationservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public spinner:NgxSpinnerService,
    public http:HttpHelperService,
    public notification:NotificationserviceService,
    public route:Router
    ) { }
  item:LoginObject = {
    email:'',
    password:''
  }

  ngOnInit(): void {
  }

  LoginAction(form:NgForm){
    let payload = {
      email:this.item.email,
      password:this.item.password
    }
    this.spinner.show()
    this.http.post(`http://localhost:4000/api/login`,payload).subscribe((res)=>{
      if(res['success']){
        this.spinner.hide();
        localStorage.setItem('token',res['response'].token);
        localStorage.setItem('fname',res['response'].fname);
        localStorage.setItem('lname',res['response'].lname);
        localStorage.setItem('email',res['response'].email);
        this.notification.showNotification('success',res['message']);
        this.route.navigate(['dashboard']);
      }else{
        this.spinner.hide();
        this.notification.showNotification('success',res['message']);
      }
    },err=>{
      this.spinner.hide();
      this.notification.showNotification('error',err.message)
    })
  }

}

export interface LoginObject {
  email:string,
  password:string
}