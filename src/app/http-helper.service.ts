import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {
  
  constructor( private http: HttpClient, private router: Router ) { }


  getProfile(domain: String): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': token
    });
    let options = {
      headers: headers
    }
    return this.http.get(`${domain}/api/profile`, options);
  }

  get(url) {
    return this.http.get(url);
  }

  post(url, body) {
    return this.http.post(url, body);
  }

  getAuth(url) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': token
    });
    let options = {
      headers: headers
    };
    return this.http.get(url, options).pipe(map(res => {
      if(res['sessionexp']) {
        localStorage.clear();
        this.router.navigate(['/']);
      } else {
        return res;
      }
    }));
  }

  postAuth(url, body) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': token
    });
    let options = {
      headers: headers
    };
    return this.http.post(url, body, options).pipe(map(res => {
      if(res['sessionexp']) {
        localStorage.clear();
        this.router.navigate(['/']);
      } else {
        return res;
      }
    }));
  }



  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
