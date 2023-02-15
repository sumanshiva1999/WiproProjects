import { Component, Input, OnInit } from '@angular/core';
import { InternetService } from 'src/Services/internet.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  count = 0;    //each cart item count
  wishlistItems: any= [];
  @Input("userName") userName: string= "giri@gmail.com";
  storeUrl = "http://localhost:8084/mongo/store/";

  constructor(private service: InternetService) { }

  ngOnInit(): void {
    console.log("wishlist oninit");
    this.getWishlist();
  }

  getWishlist() {
    this.service.get(this.storeUrl+"get-wishlist/"+this.userName)
    .subscribe({next: (response) => {
      this.wishlistItems = (response);
      this.count= this.wishlistItems.length;
    }});
  }

  addToCart(product: any) {
    product.quantity= 1;
    this.service.put(this.storeUrl+"add-to-cart/"+this.userName, product)
    .subscribe((response) => {
      this.removeFromWishlist(response);
    })

  }

  removeFromWishlist(product: any) {
    this.service.put(this.storeUrl+"delete-wishlist/"+this.userName, product)
    .subscribe((response) => {
      this.getWishlist();
    })
  }

}
