import { Class, Location, Passenger, TripType } from "../../providers/HomeBookingCardContextProvider";

export const tripTypes: TripType[] = [
{ id: 1, name: "One way", complete: true},
{ id: 2, name: "Round trip", complete: false },
{ id: 3, name: "Multi trip", complete: false },
];

export const locations: Location[] = [
{ id: 1, city: "Oslo", country: "Norway", complete: false},
{ id: 2, city: "Stavanger", country: "Norway", complete: false },
{ id: 3, city: "Bergen", country: "Norway", complete: false },
{ id: 4, city: "Trondheim", country: "Norway", complete: false },
];

export const passengers: Passenger[] = [
{ id: 1, type: "Adult", description: "hey man what", count: 1},
{ id: 2, type: "Child 12-15", description: "Age upon departure", count: 0},
{ id: 3, type: "Child 2-11", description: "Age upon departure", count: 0},
{ id: 4, type: "Infant 0-2", description: "Age upon return", count: 0},
];

export const classes: Class[] = [
{ id: 1, name: "All travel classes"},
{ id: 2, name: "Economy"},
{ id: 3, name: "Business"},
];
