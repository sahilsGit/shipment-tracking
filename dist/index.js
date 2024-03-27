"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function containsAll(arr1, arr2) {
    return arr2.every((item) => arr1.includes(item));
}
function validateTrips(shipment, trips) {
    const allPickups = trips.flatMap((trip) => trip.pickups);
    if (!containsAll(allPickups, shipment.pickups)) {
        return false;
    }
    console.log(allPickups);
    const allDrops = trips.flatMap((trip) => trip.drops);
    if (!containsAll(allDrops, shipment.drops)) {
        return false;
    }
    console.log(allDrops);
    const warehouseUsed = trips.some((trip) => trip.via !== undefined);
    if (warehouseUsed) {
        const warehouseTrips = trips.filter((trip) => trip.via !== undefined);
        const warehouseLocation = warehouseTrips[0].via;
        for (const trip of warehouseTrips) {
            if (trip.via !== warehouseLocation) {
                return false;
            }
            const allLocations = [...trip.pickups, ...trip.drops, trip.via];
            if (new Set(allLocations).size !== allLocations.length) {
                return false;
            }
        }
    }
    return true;
}
const shipment = {
    pickups: ["A", "B"],
    drops: ["C", "D"],
};
const validTrips = [
    { pickups: ["A"], via: "W", drops: [] },
    { pickups: ["B"], via: "W", drops: [] },
    { pickups: [], via: "W", drops: ["C"] },
    { pickups: [], via: "W", drops: ["D"] },
];
const invalidTrips = [
    { pickups: ["A"], via: "W1", drops: [] },
    { pickups: ["B"], via: "W2", drops: [] },
    { pickups: [], via: "W3", drops: ["C"] },
    { pickups: [], via: "W4", drops: ["D"] },
];
console.log(validateTrips(shipment, validTrips));
console.log(validateTrips(shipment, invalidTrips));
//# sourceMappingURL=index.js.map