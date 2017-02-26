import { Component, OnInit } from '@angular/core';
import { ImagesService } from './services/images.service';
import { ImageModel } from './models/imageModel';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app works!';
  images: ImageModel[];
  listView = true;

  constructor(private service: ImagesService)  {

  } 

  ngOnInit() {
    this.images = new Array<ImageModel>();
    this.service.getImages().subscribe(imgs => this.images = imgs);
  }

  toggleView() {
    this.listView = !this.listView;
  }
}
