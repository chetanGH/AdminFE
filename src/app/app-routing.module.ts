import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:NavbarComponent,
    children:[
      {
        path:'',
        component:DashboardComponent,
        canActivate:[AuthGuardGuard]
      },
      {
        path:'addProduct',
        component:AddProductComponent,
        canActivate:[AuthGuardGuard]
      },
      {
        path:'salesOrder',
        component:SalesOrderComponent,
        canActivate:[AuthGuardGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
