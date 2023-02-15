import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler{

    handleError(error: any): void {
        //alert("Unknown Error"); //display toast message
        console.log(error); //log error to server
    }

}