import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppError } from 'src/app/Errors/AppError';
import { BadRequest } from 'src/app/Errors/BadRequest';

@Injectable({
  providedIn: 'root'
})
export class InternetService {

  public currentUser: any;  //current user details

  constructor(private http: HttpClient) { }

  get(url: string) {
    return (this.http.get(url)
    .pipe(
      catchError((err: Response) => {
        return throwError(() => new AppError(err));       
      }))   
    ); 
  }

  post(url: string, body: any) {
    return (this.http.post(url, body)
    .pipe( catchError(this.handleError) ));
  }

  put(url: string, body: any) {
    return (this.http.put(url, body)
    .pipe(
      catchError((err: Response) => {
        return throwError(() => new AppError("PUT Error"));       
      })) 
    );
  }

  patch(url: string, body: any) {
    return (this.http.patch(url, body)
    .pipe(
      catchError((err: Response) => {
        return throwError(() => new AppError("Patch Error"));       
      })) 
    );
  }

  delete(url: string, body: any) {
    console.log("delete from service");
    return (this.http.delete(url)
    .pipe(
      catchError((err: Response) => {
        return throwError(() => new AppError(err));       
      })) 
    );
  }

  private handleError(error: Response) {
    if(error.status === 400)
      return throwError(() => new BadRequest(error));
    else if(error.status == 208)
      return of("The product is already in the Wishlist");
    else if(error.status == 201)
      return of("The product added to the Wishlist Succesfully.");
    else
      return throwError(() => new AppError(error));
  }
  



  getAllProducts(url: string) {
    return (this.http.get(url));
    // .subscribe({
    //   next: (response) => {
    //     products = response;
    //     console.log("next", response);
    //     // return response;
    //   },
    //   error: (err) => {
    //     return(err);
    //   },
    //   complete: () => {
    //     console.log("complete", products);
    //     return products; 
    //   }
    // });
    // return (products);
  }

  addToWishlistOrCart(url:string, product: any) {
    return (this.http.post(url, product))
  }

  saveProduct(url: string, product: any) {
    return (this.http.post(url, product));
  }

}
