import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../model/products';

const api_URL = 'http://localhost:3000'; 

@Injectable({
  providedIn: 'root'
})
export class NAMKUBAPIService {

  constructor(private httpClient: HttpClient) { }

  getAllProduct(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(`${api_URL}/products`);
  }
  
}

