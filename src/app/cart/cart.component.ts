import { Component, Input, OnInit } from '@angular/core';
import { InternetService } from 'src/Services/internet.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

})
export class CartComponent implements OnInit {

  count = 0;    //each cart item count

  cartItems: any= [];
  @Input("userName") userName: string= "giri@gmail.com";
  cartUrl = "http://localhost:8084/mongo/store/";  

  constructor(private service: InternetService) { }

  ngOnInit(): void {
    console.log("cart oninit");
    this.getCart();
  }

  getCart() {
    this.service.get(this.cartUrl+"get-cart/"+this.userName)
    .subscribe({next: (response) => {
      this.cartItems = (response);
      this.count= this.cartItems.length;
    }});
  }

  updateCart(product: any) {
    this.service.put(this.cartUrl+"update-cart/"+this.userName, product)
    .subscribe((response) => {
      this.cartItems= response;
    })
  }

  deleteCartItem(product: any) {
    this.service.put(this.cartUrl+"delete-cart-item/"+this.userName, product)
    .subscribe((response) => {
      this.getCart();
      console.log(response);
    })
  }


}

