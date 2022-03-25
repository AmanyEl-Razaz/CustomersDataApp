import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Customers } from '../customers';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-apicall',
  templateUrl: './customer-apicall.component.html',
  styleUrls: ['./customer-apicall.component.css']
})
export class CustomerApicallComponent implements OnInit {
  clicked = true;
  CustomerList: Customers[];
  customerForm: any;
  class = "";
  massage = "";
  customerId = 0;
  dir = "des";
  sortById = "";
  sortByName = "";
  sortByClass = "";
  sortByPhone = "";
  sortByEmail = "";
  constructor(private formbuilder: FormBuilder, private httpClient: HttpClient, private customerService: CustomersService) { }


  ngOnInit() {
    this.class = "0";
    this.customerForm = this.formbuilder.group({
      customerName: ['', [Validators.required]],
      customerClass: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
    this.getCustomerList();
  }
  getCustomerList() {
    this.customerService.getCustomerList().subscribe(res => {
      this.CustomerList = res
    });


  }
  PostCustomer(customer: Customers) {
    const customer_Master = this.customerForm.value;
    var cust = new Customers();
    cust.customerName = customer_Master.customerName;
    cust.customerClass = customer_Master.customerClass;
    cust.phone = customer_Master.phone;
    cust.email = customer_Master.email;
    cust.comment = customer_Master.comment;
    this.customerService.postCustomerData(cust).subscribe(
      () => {
        this.massage = 'Data Saved Successfully';
        this.getCustomerList();
        this.ClearFields();
      }
    );
  }
  CustomerDetailsToEdit(id: number) {
    debugger;
    this.clicked = false;
    this.customerService.getCustomerDetailsById(id).subscribe(customerResult => {
      this.customerId = customerResult.id;
      this.customerForm.controls['customerName'].setValue(customerResult.customerName);
      this.customerForm.controls['customerClass'].setValue(customerResult.customerClass);
      this.customerForm.controls['phone'].setValue(customerResult.phone);
      this.customerForm.controls['email'].setValue(customerResult.email);
      this.customerForm.controls['comment'].setValue(customerResult.comment);
    });
  }
  UpdateCustomer(customer: Customers) {
    debugger;
    customer.id = this.customerId;
    const customer_Master = this.customerForm.value;
    this.customerService.updateCustomer(customer_Master).subscribe(() => {
      this.massage = 'Record Updated Successfully';
      this.getCustomerList();
      this.ClearFields();
    });
  }
  DeleteCustomer(customer: Customers) {
    customer.id = this.customerId;
    const customer_Master = this.customerForm.value;
    if (confirm('Do you want to delete this customer?')) {
      this.customerService.deleteCustomerById(customer_Master.id).subscribe(() => {
        this.getCustomerList();
        this.ClearFields();
      });
    }
  }

  ClearFields() {
    this.customerForm.controls['customerName'].setValue("");
    this.customerForm.controls['customerClass'].setValue("");
    this.customerForm.controls['phone'].setValue("");
    this.customerForm.controls['email'].setValue("");
    this.customerForm.controls['comment'].setValue("");
  }
  SortBy(colName: string) {
    this.ClearSort();
    if (colName == 'id') {
      if (this.dir == "des") {
        this.CustomerList.sort((a, b) => (a.id - b.id));
        this.sortById = "A-Z";
      }
      else {
        this.CustomerList.sort((a, b) => (b.id - a.id));
        this.sortById = "Z-A";
      }
    }
    else if (colName == 'name') {
      if (this.dir == "des") {
        this.CustomerList.sort((a, b) => (a.customerName < b.customerName) ? -1 : ((a.customerName > b.customerName) ? 1 : 0));
        this.sortByName = "A-Z";
      } else {
        this.CustomerList.sort((a, b) => (b.customerName < a.customerName) ? -1 : ((b.customerName > a.customerName) ? 1 : 0));
        this.sortByName = "Z-A";
      }
    }
    else if (colName == 'class') {
      if (this.dir == "des") {
        this.CustomerList.sort((a, b) => (a.customerClass < b.customerClass) ? -1 : ((a.customerClass > b.customerClass) ? 1 : 0));
        this.sortByClass = "A-Z";
      } else {
        this.CustomerList.sort((a, b) => (b.customerClass < a.customerClass) ? -1 : ((b.customerClass > a.customerClass) ? 1 : 0));
        this.sortByClass = "Z-A";
      }
    }
    else if (colName == 'phone') {
      if (this.dir == "des") {
        this.CustomerList.sort((a, b) => (a.phone < b.phone) ? -1 : ((a.phone > b.phone) ? 1 : 0));
        this.sortByPhone = "A-Z";
      } else {
        this.CustomerList.sort((a, b) => (b.phone < a.phone) ? -1 : ((b.phone > a.phone) ? 1 : 0));
        this.sortByPhone = "Z-A";
      }
    }
    else if (colName == 'email') {
      if (this.dir == "des") {
        this.CustomerList.sort((a, b) => (a.email < b.email) ? -1 : ((a.email > b.email) ? 1 : 0));
        this.sortByEmail = "A-Z";
      } else {
        this.CustomerList.sort((a, b) => (b.email < a.email) ? -1 : ((b.email > a.email) ? 1 : 0));
        this.sortByEmail = "Z-A";
      }
    }
    if (this.dir == "des") {
      this.dir = "ass";
    } else {
      this.dir = "des";
    }
    console.log("after", this.CustomerList)

  }
  UnSort() {
    this.CustomerList.sort((a, b) => (a.id - b.id));
    this.ClearSort();
  }
  ClearSort() {
    this.sortById = "";
    this.sortByName = "";
    this.sortByClass = "";
    this.sortByPhone = "";
    this.sortByEmail = "";
  }
}
