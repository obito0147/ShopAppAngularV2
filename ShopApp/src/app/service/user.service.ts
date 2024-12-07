import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { RegisterDTO } from '../dto/register.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrls = "http://localhost:8084/api/v1/users/register";
  constructor(private http: HttpClient) {}
  register(registerDTO : RegisterDTO) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(this.apiUrls, registerDTO, {headers})
  }
}
