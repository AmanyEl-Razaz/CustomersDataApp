import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerApicallComponent } from './customer-apicall/customer-apicall.component';

const routes: Routes = [
  { path: 'customer', component: CustomerApicallComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
