import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiServiceProvider {

    private URL = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/41091/";
    private API_KEY="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYXJvbi5tYW5jZXJhLmNhbnRhZG9yLmFsdUBpZXNqdWxpb3Zlcm5lLmVzIiwianRpIjoiYjI0Nzg4ODEtMjZlMi00NTVmLTk0MzAtOWJmNTVhZWY4NmY3IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzMyNTEzNzksInVzZXJJZCI6ImIyNDc4ODgxLTI2ZTItNDU1Zi05NDMwLTliZjU1YWVmODZmNyIsInJvbGUiOiIifQ.XlFIKCOxf3E-UgZlgMPzFVWcqdfQ2EqS8g8_KKiUkh8";
    constructor(public http: HttpClient) {
    }

    getPrevisionDiariaMunicipio(): Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get(this.URL + "?api_key="+this.API_KEY).toPromise()
                .then((data: any) => {
                    console.log(data)
                    resolve(data);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getAlumnos

}//end_class