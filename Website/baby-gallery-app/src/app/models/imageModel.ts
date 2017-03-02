export class ImageModel {
    Url: string;
    Description: string;
    Tags: Array<string>;

    constructor() {
        this.Url = '';
        this.Description = '';
        this.Tags = new Array<string>();
    }
}