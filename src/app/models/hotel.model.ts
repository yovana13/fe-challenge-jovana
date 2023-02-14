import { Address } from "./address.model";

export interface Hotel {
    title: string;
    address: Address;
    position: {lat : number, lng: number};
    distance: number;
}
