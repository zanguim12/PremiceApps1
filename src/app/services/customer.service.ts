/*import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Customer } from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  host: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.host + '/customers');
  }

  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.host}/customers/${id}`);
  }

  public searchCustomers(name: string): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.host + `/customers/search?keyword=${name}`);
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.host + '/customers', customer);
  }

  public deleteCustomer(id: number) {
    return this.http.delete(this.host + "/customers/" + id);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.host + `/customers/${customer.id}`, customer);
  }
}
*/
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Customer } from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // Base URL for the JSON server
  host: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // Fetch all customers from the JSON server
  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${this.host}/customers`);
  }

  // Fetch a single customer by ID
  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.host}/customers/${id}`);
  }

  // Search customers by name using a query parameter
  public searchCustomers(name: string): Observable<Array<Customer>> {
    // JSON server supports filtering with query parameters
    return this.http.get<Array<Customer>>(`${this.host}/customers?name_like=${name}`);
  }

  // Save a new customer to the JSON server
  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.host}/customers`, customer);
  }

  // Delete a customer by ID
  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/customers/${id}`);
  }

  // Update an existing customer
  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.host}/customers/${customer.id}`, customer);
  }
}