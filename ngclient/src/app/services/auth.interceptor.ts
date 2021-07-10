import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private toastr:ToastrService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>{
        const hardcodedToken = 'asd';
        req = req.clone({
            setHeaders:{
                Authorization: `Bearer ${hardcodedToken}`
            }
        })
 
        return next.handle(req)
            .pipe(  
                catchError((error: HttpErrorResponse) => {
                    alert(`HTTP Error: ${req.url}`);
                    console.log(error);
                    this.toastr.error('Error');
                    
                    return throwError(error);
                }))
    }
}
