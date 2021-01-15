import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpHelperService } from '../http-helper.service';
import { NotificationserviceService } from '../notificationservice.service';



@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {
  selectedProduct:any;
  products:any = [];

  quantity:Number;
  constructor(
    public notification:NotificationserviceService,
    public http:HttpHelperService,
    public spinner:NgxSpinnerService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.selectedProduct);
  }

  getProducts(){
    this.http.getAuth('http://localhost:4000/api/getAllProducts').subscribe((res)=>{
      if(res['success']){
        this.products = res['response'];
      }
    })
  }

  onSelectionChange(event:any){
    console.log(event.target.value)
    this.selectedProduct = event.target.value;
  }

  addSalesOrder(form:NgForm){
    if(this.selectedProduct){
      if(this.quantity > 0){
          this.spinner.show();
          this.http.postAuth('http://localhost:4000/api/createSalesOrder',{'item':this.selectedProduct,'quantity':this.quantity}).subscribe((res)=>{
            if(res){
              if(res['success']){
                this.spinner.hide();
                form.resetForm();
                this.notification.showNotification('success','item added.');
                this.goBack();
              }else{
                this.spinner.hide();
                this.notification.showNotification('error',res['message']); 
              }
            }else{
              this.spinner.hide()
            }
          },err=>{
            this.spinner.hide();
            this.notification.showNotification('error',err.message)
          })
      }else{
        this.notification.showNotification('error','Quantity must be positive.')
      }
    }else{
      this.notification.showNotification('error','Please select item from dropdown')
    }
  }

  resetForm(form:NgForm){
    form.resetForm()
  }
  
  goBack(){
    this.router.navigate(['dashboard'])
  }
}
