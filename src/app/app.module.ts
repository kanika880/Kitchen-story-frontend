import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UserapiService } from './service/userapi.service';
import { AuthenticationService } from './service/authentication.service';
import { SigninComponent } from './signin/signin.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ProductapiService } from './service/productapi.service';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { ListordersComponent } from './orders/listorders/listorders.component';
import { AccountComponent } from './account/account.component';
import { CreateproductComponent } from './products/createproduct/createproduct.component';
import { UpdateproductComponent } from './products/updateproduct/updateproduct.component';
import { CartComponent } from './cart/cart.component';
import { OrderdetailsComponent } from './orders/orderdetails/orderdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    ProductsComponent,
    HomeComponent,
    LogoutComponent,
    ListordersComponent,
    AccountComponent,
    CreateproductComponent,
    UpdateproductComponent,
    CartComponent,
    OrderdetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthenticationService,UserapiService,ProductapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
