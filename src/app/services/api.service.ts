import {Injectable} from '@angular/core';
import { environment } from 'src/environment';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: "root" 
})
export class ApiService {

    private errorMessage = '';

    constructor(private http: HttpClient) {}

    getHotels() {
        return this.http.get(environment.BACKEND_URL).pipe(catchError(this.error));
    }

    private error(error: HttpErrorResponse) {
        error.error 
        ? (this.errorMessage = error.error.errorMessage)
        : (this.errorMessage = `Error code: ${error.status}\n Message: ${error.message}`);

        return throwError(this.errorMessage);
    }

}
