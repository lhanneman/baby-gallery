import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ImageModel } from '../models/imageModel';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';



@Injectable()
export class ImagesService {

    constructor(private http: Http) {

    
    }

// need to update web api to return the cors header for allow-access-same-origin or wahtever
    //getImages(): Observable<Array<ImageModel>> {
    //    return this.http.get('http://landon-image-api.azurewebsites.net/images').map(resp => resp.json());
    //}

    getImages(): Observable<ImageModel[]> {
        //[{"Url":"https://landonaugust.blob.core.windows.net/pictures/IMG_0138.JPG"}]
        let imgs = new Array<ImageModel>();
        let img = new ImageModel();
        img.url = 'https://landonaugust.blob.core.windows.net/pictures/IMG_0138.JPG';
        imgs.push(img);

        let img2 = new ImageModel();
        img2.url = 'https://landonaugust.blob.core.windows.net/pictures/IMG_0125.JPG';
        imgs.push(img2);

        return Observable.of(imgs);
    }



}