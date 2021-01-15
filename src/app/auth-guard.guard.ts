import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHelperService } from './http-helper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    public service:HttpHelperService,
    public router:Router
  ){

  }
  canActivate():boolean{
    if(localStorage.getItem('token')) {
      this.service.getProfile('http://localhost:4000').subscribe(res => {
        if(res['success']) {
          return true;
        }
        else {
          localStorage.clear();
          this.router.navigate(['/']);
          return false;
        }
      }, (err) => {
        localStorage.clear();
        this.router.navigate(['/']);
      });
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }
  }
  
  
}
