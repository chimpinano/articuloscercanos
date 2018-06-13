export class Coordinates {
    latitude: string | number;
    longitude: string | number;
    accuracy?: number;

    constructor(that?: Coordinates) {
        if (that) {
            this.latitude = +that.latitude;
            this.longitude = +that.longitude;
            this.accuracy = +that.accuracy;
        }
    }
}
