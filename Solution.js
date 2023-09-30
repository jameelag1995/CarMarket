const carMarket = require("./obj.js");

/* -------------------------------------------------------------------------- */
/*                              Agency Operations                             */
/* -------------------------------------------------------------------------- */

/* ------------------- Search for a car agency by its Name ------------------ */

function searchForCarAgencyByName(agencyName) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            return agency;
        }
    }
    return `Agency not found!`;
}

// Test
console.log("Testing search for car agency by name: ");
const foundAgencyByName = searchForCarAgencyByName("Best Deal");
console.log(foundAgencyByName);
console.log("************************");

/* -------------------- Search for a car agency by its Id ------------------- */

function searchForCarAgencyById(agencyId) {
    for (const agency of carMarket.sellers) {
        if (agencyId === agency.agencyId) {
            return agency;
        }
    }
    return `Agency not found!`;
}

// Test
console.log("Testing search for car agency by id: ");
const foundAgencyById = searchForCarAgencyById("26_IPfHU1");
console.log(foundAgencyById);
console.log("************************");

/* ---------------------- Retrieve all agencies' names ---------------------- */

function retrieveAgenciesNames() {
    const agenciesNamesArray = [];
    for (const agency of carMarket.sellers) {
        agenciesNamesArray.push(agency.agencyName);
    }
    return agenciesNamesArray;
}

// Test
console.log("Testing retrieve agencies names: ");
console.log("agencies names: ", retrieveAgenciesNames());
console.log("************************");

/* ----------------- Add a new car to an agency's inventory ----------------- */

function addCarToAgencyInventory(agencyName, brand, car) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const currBrand of agency.cars) {
                if (brand == currBrand.brand) {
                    currBrand.models.push(car);
                    return `Car Added to Inventory`;
                }
            }
        }
    }
    return `Agency not found!`;
}

// Test
console.log(
    "Testing adding car to agency inventory we add this car then remove it in the next function: "
);
const newCar = {
    name: "x5",
    year: 2020,
    price: 90000,
    carNumber: "4Ixb100",
    ownerId: "FQvNsEwXY",
};
console.log(addCarToAgencyInventory("Best Deal", "bmw", newCar));
console.log("************************");

/* ---------------- Remove a car from an agency's inventory. ---------------- */

function removeCarFromAgencyInventory(agencyName, carNumber) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const currBrand of agency.cars) {
                for (let i = 0; i < currBrand.models.length; i++) {
                    if (currBrand.models[i].carNumber === carNumber) {
                        currBrand.models.splice(i, 1);
                        return `Car removed from Inventory`;
                    }
                }
            }
        }
    }
    return `Agency or Car Number not found!`;
}

// Test

console.log("Testing remove car from agency inventory: ");
console.log(removeCarFromAgencyInventory("Best Deal", "bmw", "4Ixb100"));
console.log("************************");

/* ---------------------- Change the cash of an agency. --------------------- */

function changeCash(agencyName, newCash) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            agency.cash = newCash;
            return `Cash changed Successfully`;
        }
    }
    return `Agency not found!`;
}

// Test
console.log("Testing changing cash: ");
console.log(
    "agency cash before change: ",
    searchForCarAgencyByName("The Auto World").cash
);
console.log(changeCash("The Auto World", 1000000));
console.log(
    "agency cash after change: ",
    searchForCarAgencyByName("The Auto World").cash
);
console.log("************************");

/* ---------------------- Change the cash of an agency. --------------------- */

function changeCredit(agencyName, newCredit) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            console.log(agency.credit);
            agency.credit = newCredit;
            console.log(agency.credit);

            return `Credit changed Successfully`;
        }
    }
    return `Agency not found!`;
}

// Test
console.log("Testing changing credit: ");
console.log(
    "agency credit before change:",
    searchForCarAgencyByName("The Auto World").credit
);
console.log(changeCredit("The Auto World", 1000000));
console.log(
    "agency credit after change:",
    searchForCarAgencyByName("The Auto World").credit
);
console.log("************************");

/* ------------- a function I built to search for car and brand ------------- */
carMarket.getCarAndBrand = function (agencyName, carNumber) {
    let car = {};
    let brand = {};
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const currBrand of agency.cars) {
                for (let i = 0; i < currBrand.models.length; i++) {
                    if (currBrand.models[i].carNumber === carNumber) {
                        brand = currBrand;
                        car = currBrand.models[i];
                        return [brand, car];
                    }
                }
            }
        }
    }
    return false;
};

/* ------------- Update the price of a specific car in an agency ------------ */

carMarket.updateCarPrice = function (agencyName, carNumber, newPrice) {
    const car = carMarket.getCarAndBrand(agencyName, carNumber)[1];
    if (typeof car === "object" && car != null) {
        car.price = newPrice;
        return `price have changed`;
    }
    return `Agency or CarNumber not found!`;
};

// Test
console.log("Testing car price update: ");
console.log(
    "car price before update: ",
    carMarket.getCarAndBrand("CarMax", "4Ixb0")[1].price
);
carMarket.updateCarPrice("CarMax", "4Ixb0", 200000);
console.log(
    "car price after update: ",
    carMarket.getCarAndBrand("CarMax", "4Ixb0")[1].price
);
console.log("************************");

/* ------ Calculate and return the total revenue for a specific agency ------ */

carMarket.getTotalAgencyRevenue = function (agencyName) {
    let totalRevenue = 0;
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const currBrand of agency.cars) {
                for (let i = 0; i < currBrand.models.length; i++) {
                    totalRevenue += currBrand.models[i].price;
                }
            }
        }
    }
    return totalRevenue;
};

// Test
console.log("Testing care agency total revenue: ");
console.log(
    "CarMax Agency total revenue: ",
    carMarket.getTotalAgencyRevenue("CarMax")
);
console.log("************************");

/* ---------------- Transfer a car from one agency to another --------------- */

carMarket.transferCarBetweenAgencies = function (
    fromAgency,
    toAgency,
    carNumber
) {
    const [carBrand, car] = this.getCarAndBrand(fromAgency, carNumber);
    addCarToAgencyInventory(toAgency, carBrand.brand, car);
    removeCarFromAgencyInventory(fromAgency, carBrand.brand, car);
};

// Test
console.log("Testing transfer car between agencies: ");
console.log("models before transfer: ", carMarket.sellers[0].cars[0].models);
carMarket.transferCarBetweenAgencies("CarMax", "Best Deal", "4Ixb0");
console.log("models after transfer: ", carMarket.sellers[0].cars[0].models);
console.log("************************");

/* -------------------------------------------------------------------------- */
/*                             Customer Operations                            */
/* -------------------------------------------------------------------------- */

/* --------------- Search for a customer by their name or ID. --------------- */
function getCustomerByName(customerName) {
    for (const currCustomer of carMarket.customers) {
        if (currCustomer.name === customerName) {
            return currCustomer;
        }
    }
    return `customer not found!`;
}

// Test
console.log("Testing get customer by name: ");
let customer = getCustomerByName("Ravi Murillo");
console.log("customer: ", customer);
console.log("************************");

function getCustomerById(customerId) {
    for (const currCustomer of carMarket.customers) {
        if (currCustomer.id === customerId) {
            return currCustomer;
        }
    }
    return `customer not found!`;
}

// Test
console.log("Testing get customer by id: ");
let customer2 = getCustomerById("FQvNsEwLZ");
console.log("customer: ", customer2);
console.log("************************");

/* --------------------- Retrieve all customers' names. --------------------- */
function getAllCustomersNames() {
    const customersNamesArr = [];
    for (const currCustomer of carMarket.customers) {
        customersNamesArr.push(currCustomer.name);
    }
    return customersNamesArr;
}

// Test
console.log("Testing get all customers names: ");
console.log("Customers Names: ", getAllCustomersNames());
console.log("************************");

/* --------------------- Change the cash of a customer. --------------------- */
function customerChangeCash(customerId, newCash) {
    let customer = getCustomerById(customerId);
    customer.cash = newCash;
    return `cash changed`;
}

// Test
console.log("Testing cash change: ");
console.log("customer cash before change: ", getCustomerById("FQvNsEwLZ").cash);
customerChangeCash("FQvNsEwLZ", 3000000);
console.log("customer cash after change: ", getCustomerById("FQvNsEwLZ").cash);
console.log("************************");

/* --- Calculate the total value of all cars owned by a specific customer --- */
carMarket.getCustomerTotalCarValue = function (customerId) {
    const customer = getCustomerById(customerId);
    let totalValue = 0;
    for (const currCar of customer.cars) {
        totalValue += currCar.price;
    }
    return totalValue;
};

// Test
console.log("Testing get customer total cars values: ");
console.log(
    "customer total cars values:",
    carMarket.getCustomerTotalCarValue("FQvNsEwLZ")
);
console.log("************************");

/* -------------------------------------------------------------------------- */
/*                           Car Purchase Operations                          */
/* -------------------------------------------------------------------------- */

function sellCar(customerId, carNumber, agencyName) {
    let agency = searchForCarAgencyByName(agencyName);
    if (agency != `Agency not found!`) {
        let car = carMarket.getCarAndBrand(agencyName, carNumber)[1];
        let customer = getCustomerById(customerId);
        if (car) {
            if (customer != `customer not found!`) {
                if (car.price < customer.cash) {
                    customer.cars.push(car);
                    customer.cash -= car.price;
                    agency.credit += car.price;
                    removeCarFromAgencyInventory(agency.agencyName, carNumber);
                    carMarket.taxesAuthority.totalTaxesPaid +=
                        (car.price * 20) / 100; // suppose tax is 20%
                    carMarket.taxesAuthority.sumOfAllTransactions +=
                        car.price + (car.price * 20) / 100;
                    carMarket.taxesAuthority.numberOfTransactions++;

                    return `Car was sold successfully to ${customer.name} from ${agency.agencyName} agency`;
                } else {
                    return `customer doesn't have enough cash`;
                }
            } else {
                return customer;
            }
        } else {
            return `car not found!`;
        }
    }
    return agency;
}

// Test
console.log("Testing selling a car: ");
console.log(sellCar("FQvNsEwLZ", "AZJZ4", "Carsova"));
console.log("************************");

/* ------- Calculate and return the total revenue of the entire market ------ */

carMarket.getTotalMarketRevenue = function () {
    let totalRevenue = 0;
    for (const agency of this.sellers) {
        totalRevenue += this.getTotalAgencyRevenue(agency.agencyName);
    }
    return totalRevenue;
};
// Test
console.log("Testing get total market revenue: ");
console.log("Total Market Revenue: $", carMarket.getTotalMarketRevenue());
