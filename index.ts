type Location = string;
type Shipment = {
  pickups: Location[];
  drops: Location[];
};
type Trip = {
  pickups: Location[];
  drops: Location[];
  via?: Location;
};

// Helper function to check if an array contains all elements of another array
function containsAll(arr1: Location[], arr2: Location[]): boolean {
  return arr2.every((item) => arr1.includes(item));
}

// Function to validate a set of trips for a given shipment
function validateTrips(shipment: Shipment, trips: Trip[]): boolean {
  // Check if all pickup points are covered
  const allPickups = trips.flatMap((trip) => trip.pickups);
  if (!containsAll(allPickups, shipment.pickups)) {
    return false;
  }

  // Check if all drop points are covered
  const allDrops = trips.flatMap((trip) => trip.drops);
  if (!containsAll(allDrops, shipment.drops)) {
    return false;
  }

  // Check if warehouse is warehouse exists
  const warehouseUsed: boolean = trips.some((trip) => trip.via !== undefined);

  // If warehouse is used
  if (warehouseUsed) {
    // All pickups and drops must go through the warehouse
    const warehouseTrips: Trip[] = trips.filter(
      (trip) => trip.via !== undefined
    );

    // Get the ware house location
    const warehouseLocation = warehouseTrips[0].via;

    // Loop through Trips and
    for (const trip of warehouseTrips) {
      if (trip.via !== warehouseLocation) {
        return false; // Different warehouses used in different trips
      }

      const allLocations = [...trip.pickups, ...trip.drops, trip.via];
      if (new Set(allLocations).size !== allLocations.length) {
        return false; // Duplicate locations in a single trip
      }
    }
  }

  return true;
}

// Example usage
const shipment: Shipment = {
  pickups: ["A", "B"],
  drops: ["C", "D"],
};

const validTrips: Trip[] = [
  { pickups: ["A"], via: "W", drops: [] },
  { pickups: ["B"], via: "W", drops: [] },
  { pickups: [], via: "W", drops: ["C"] },
  { pickups: [], via: "W", drops: ["D"] },
];

const invalidTrips: Trip[] = [
  { pickups: ["A"], via: "W1", drops: [] },
  { pickups: ["B"], via: "W2", drops: [] },
  { pickups: [], via: "W3", drops: ["C"] },
  { pickups: [], via: "W4", drops: ["D"] },
];

console.log(validateTrips(shipment, validTrips)); // true
console.log(validateTrips(shipment, invalidTrips)); // false
