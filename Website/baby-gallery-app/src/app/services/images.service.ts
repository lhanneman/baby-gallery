import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ImageModel } from '../models/imageModel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';



@Injectable()
export class ImagesService {

    constructor(private http: Http) { }

    getImages(): Observable<ImageModel[]> {
        return this.http.get('http://landon-image-api.azurewebsites.net/images').map(resp => resp.json());
    }

//     getImages(): Observable<ImageModel[]> {

        
//         let json = `[
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0112.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0113.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0114.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0115.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0116.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0119.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0120.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0121.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0123.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0124.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0125.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0126.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0127.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0128.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0129.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0130.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0131.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0135.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0137.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0138.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0139.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0140.jpg"
//     },
//     {
//         "Url": "https://landonaugust.blob.core.windows.net/pictures/IMG_0142.png"
//     }
// ]`;
//         //let model: ImageModel[] = JSON.parse(json);
//         return Observable.of(JSON.parse(json));
//     }



}