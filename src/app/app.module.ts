import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import {TableModule} from 'primeng/table';
import { ChartcomponentComponent } from './chartcomponent/chartcomponent.component';
import {AuthGuardGuard} from './auth-guard.guard';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './add-product/add-product.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    ChartcomponentComponent,
    AddProductComponent,
    SalesOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    DropdownModule,
    // BrowserAnimationsModule,
    ToastModule,
    TableModule,
    DialogModule
    
  ],
  providers: [AuthGuardGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  bootstrap: [AppComponent]
})
export class AppModule { }
