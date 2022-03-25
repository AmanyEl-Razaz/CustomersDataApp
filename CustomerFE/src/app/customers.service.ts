import { Injectable } from '@angular/core';
import { Customers } from './customers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url = 'https://localhost:44382/api/Customer/';
  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.url + 'List');
  }

  postCustomerData(customerData: Customers): Observable<Customers> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    debugger;
    return this.http.post<Customers>(this.url + 'CreateCustomer', customerData, httpHeaders);
  }
  updateCustomer(customer: Customers): Observable<Customers> {
    const httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Customers>(this.url + 'UpdateCustomer?id=' + customer.id, customer, httpHeaders);
  }
  deleteCustomerById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteCustomer?id=' + id, null);
  }
  getCustomerDetailsById(id: number): Observable<Customers> {
    return this.http.get<Customers>(this.url + 'Details?id=' + id);
  }

}
