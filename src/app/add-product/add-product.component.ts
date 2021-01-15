import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpHelperService } from '../http-helper.service';
import { NotificationserviceService } from '../notificationservice.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  products:productInfo = {
    name:'',
    price:0,
    quantity:0
  }
  constructor(
    public notification:NotificationserviceService,
    public http:HttpHelperService,
    public spinner:NgxSpinnerService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  addProduct(form:NgForm){
    if(this.products.price > 0 && this.products.quantity > 0){
        this.spinner.show();
        this.http.postAuth('http://localhost:4000/api/addProduct',this.products).subscribe((res)=>{
          if(res){
            if(res['success']== true){
              this.spinner.hide();
              form.resetForm();
              this.notification.showNotification('success',res['message']);
              this.goBack()
            }else{
              this.spinner.hide();
              this.notification.showNotification('error',res['message']);
            }
          }else{
            this.spinner.hide();
          }
        },err=>{
          console.log(err)
          this.spinner.hide();
          if(err.status)
          this.notification.showNotification('error',err.error.message);
        })     
    }else{
      this.notification.showNotification('error','Price and quantity must be positive.')
    }
  }

  resetForm(form:NgForm){
    form.resetForm()
  }

  goBack(){
    this.router.navigate(['dashboard'])
  }
}

export interface productInfo  {
  name:string,
  price:number,
  quantity:number
}