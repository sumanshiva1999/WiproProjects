import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/Models/cartModel';
import { InternetService } from 'src/Services/internet.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  user= "giri@gmail.com";
  pending= false;               //represents true when async call is waiting for response
  response:any;

  products: any = [];
  gymProducts: any= [];
  sportsProducts: any= [];
  healthProducts: any= [];
  clothingProducts: any= [];
  accessoriesProducts: any= [];
  productsUrl: string = "http://localhost:8080/mongo/";     //store the mongo url
  storeUrl= "http://localhost:8084/mongo/store/";
  sideContainer: boolean= false;                    //display the desciption window
  displayProduct:any;                               // store clicked product
  cartproduct: any;
  itemCount: number= 0;                            // count number of items added to cart

  cartIcon= false;
  wishlistIcon= false;

  constructor(private service: InternetService) {
    // this.user = service.currentUser?.firstName;
  }

  //To divide all the products and storing in different variables
  getSeperateProducts(products: any) {
    products.filter( (element: any) => {
      if(element?.category ==="Gym")
        this.gymProducts.push(element);
      else if(element?.category ==="Sports")
        this.sportsProducts.push(element);
      else if(element?.category ==="Supplements")
        this.healthProducts.push(element);
      else if(element?.category ==="Clothing")
        this.clothingProducts.push(element);
      else
        this.accessoriesProducts.push(element);   
    } );
  }

  //shows all products available in products database
  ngOnInit(): void {
    this.service.get(this.productsUrl+"all-products")
      .subscribe({
        next: (response) => {
          this.products = response;
          this.getSeperateProducts(response);
        } })
  }

  // to display the product description
  imageContainer(product: any) {
    this.sideContainer = true;
    this.displayProduct = product;
    this.cartIcon= false;
    this.wishlistIcon= false;
    this.itemCount= 0;
  }

  //to save product to Db
  increaseProductCount(model: any) {
    // console.log("model",this.user, model);
    this.service.put(this.storeUrl+"add-to-cart/"+this.user, model)
    .subscribe((response) => {
      // console.log("response", response);
      this.cartproduct = response;
      console.log("after to cart", this.cartproduct);
      this.cartIcon = true;
    })

  }

  //delete Cart item
  deleteItem(product: any) {
    console.log("delete from component", product);
    this.service.put(this.storeUrl+"delete-cart-item/"+this.user, product)
    .subscribe((response) => {
      alert("deleted successfully");
    })
  }

  // to switch btw cart icon
  addToCart() {
    this.pending = true;
    this.itemCount= 1;

    this.displayProduct.quantity = this.itemCount;
    this.increaseProductCount(this.displayProduct);
  }

  //check itemCount with stock
  increaseCount() {
    this.pending = true;

    this.displayProduct.quantity = 1;
    this.increaseProductCount(this.displayProduct);
  }

  decreaseCount() {
    this.pending = true;
    // console.log(this.cartproduct);
    if(this.cartproduct.quantity == 1) {
      this.itemCount= 0;
      this.cartIcon= false;

      this.deleteItem(this.displayProduct);
    }else {
      this.displayProduct.quantity = -1;
      this.increaseProductCount(this.displayProduct);
    }
      
  }

  //wishlist Code
  //used to switch wishlist button and add the item to backend
  addToWishlist() {
    this.pending = true;
    this.wishlistIcon= true;


    this.service.post(this.storeUrl+"add-to-wishlist/"+this.user, this.displayProduct)
    .subscribe((response) => {
      alert(response);
    })
    // this.displayProduct.wishlist= !this.displayProduct.wishlist;
    // this.increaseProductCount(this.displayProduct);

    // this.service.addToWishlistOrCart(this.storeUrl+"add-to-wishlist/giri@gmail.com", this.displayProduct) //change the email
    // .subscribe((response) => console.log(response));
  }

  //delete from wishlist
  deleteFromWishlist() {
    this.wishlistIcon= false;

    this.service.put(this.storeUrl+"delete-wishlist/"+this.user, this.displayProduct)
    .subscribe((response) => {
      alert("removed from wishlist");
    })
  }

}
