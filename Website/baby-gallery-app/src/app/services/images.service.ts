import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ImageModel } from '../models/imageModel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ImagesService {

    constructor(private http: Http) { }

    getImages(): Observable<ImageModel[]> {
        return this.http.get('http://landon-image-api.azurewebsites.net/images').map(resp => resp.json());
    }
}