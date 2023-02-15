import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/Models/cartModel';
import { InternetService } from 'src/Services/internet.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  userName="giri@gmail.com";
  cartUrl = "http://localhost:8084/mongo/store/get-cart/"+this.userName;
  cartItems: any= [];

  constructor(private service: InternetService) {}

  ngOnInit(): void {
    this.service.get(this.cartUrl)
    .subscribe({next: (response) => {
      console.log(response);
      this.cartItems = (response);
      for (let index = 0; index < this.cartItems.length; index++) {
        const element = this.cartItems[index];
        console.log(element["image"]);
        
      }
    }});
  }
  //should contain the columns that we need to display
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity'];

  //the html gets displays this data
  transactions: any = this.cartItems;
  // [
  //   {item: 'Beach ball', cost: 4},
  //   {item: 'Towel', cost: 5},
  //   {item: 'Frisbee', cost: 2},
  //   {item: 'Sunscreen', cost: 4},
  //   {item: 'Cooler', cost: 25},
  //   {item: 'Swim suit', cost: 15},
  // ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    let costPerItem = this.cartItems.map((product: any) => {
      product?.price * product?.quantity;
    })
    return costPerItem.reduce((acc: number, value: number) => acc + value, 0);
  }
  




}

interface Transaction {
  item: string;
  cost: number;
}
