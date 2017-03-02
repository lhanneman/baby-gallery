# baby-gallery

This is a simple website for sharing pictures - I created this when my wife had our first baby.

A live demo can be seen here: http://landonaugust.com

# api

The API project is a standard C# WebAPI project which serves images from an Azure Blob Container. Just put your account name and key in the StorageConnectionString app setting in the Web.config. A container named "pictures" is assumed but this can be changed in the Images controller.

There's a very simple index.html file used as an Image uploader. This allows you to store a description and tags as metadata on the Azure Blob, and a thumbnail is also created of the image you upload.

# website / baby-gallery-app

The site itself is built with Angular 2 via the Angular CLI. This calls out to the Web API project (you'll need to update the URL to your Web API URL) and displays the thumbnails and description (tags coming soon!).