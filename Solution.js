const carMarket = require("./obj.js");

/* -------------------------------------------------------------------------- */
/*                              Agency Operations                             */
/* -------------------------------------------------------------------------- */

/* ------------------- Search for a car agency by its Name ------------------ */

// function searchForCarAgencyByName(agencyName) {
//     for (const agency of carMarket.sellers) {
//         if (agencyName === agency.agencyName) {
//             return agency;
//         }
//     }
//     return `Agency not found!`;
// }

// // Test
// const foundAgencyByName = searchForCarAgencyByName("Best Deal");
// console.log(foundAgencyByName);

/* -------------------- Search for a car agency by its Id ------------------- */

// function searchForCarAgencyById(agencyId) {
//     for (const agency of carMarket.sellers) {
//         if (agencyId === agency.agencyId) {
//             return agency;
//         }
//     }
//     return `Agency not found!`;
// }

// // Test
// const foundAgencyById = searchForCarAgencyById("26_IPfHU1");
// console.log(foundAgencyById);

/* ---------------------- Retrieve all agencies' names ---------------------- */

// function retrieveAgenciesNames() {
//     const agenciesNamesArray = [];
//     for (const agency of carMarket.sellers) {
//         agenciesNamesArray.push(agency.agencyName);
//     }
//     return agenciesNamesArray;
// }

// // Test
// console.log(retrieveAgenciesNames());

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

// // Test
// const newCar = { name: "x5", year: 2020, price: 90000, ownerId: "FQvNsEwXY" };
// console.log(addCarToAgencyInventory("Best Deal", "bmw", newCar));

carMarket.getCarAndBrand = function (agencyName,carNumber){
    const car ={}
    let brand = ''
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const currBrand of agency.cars) {
                for (let i = 0; i < currBrand.models.length; i++) {
                    if (currBrand.models[i].carNumber === carNumber) {
                        brand = currBrand.brand;
                        car = currBrand.models[i];
                        return [brand,car];
                
                    }
                }
            }
        }
    }
    return -1;
    
}
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

// // Test
// const carToRemove = {
//     name: "X5",
//     year: 2015,
//     price: 218000,
//     carNumber: "4Ixb0",
//     ownerId: "26_IPfHU1",
// };
// console.log(removeCarFromAgencyInventory("CarMax", "bmw", "4Ixb0"));

/* ---------------------- Change the cash of an agency. --------------------- */

// function changeCash(agencyName, newCash) {
//     for (const agency of carMarket.sellers) {
//         if (agencyName === agency.agencyName) {
//             agency.cash = newCash;
//             return `Cash changed Successfully`;
//         }
//     }
//     return `Agency not found!`;
// }

// // Test
// console.log(changeCash("The Auto World", 1000000));

/* ---------------------- Change the cash of an agency. --------------------- */

// function changeCredit(agencyName, newCredit) {
//     for (const agency of carMarket.sellers) {
//         if (agencyName === agency.agencyName) {
//             console.log(agency.credit);
//             agency.credit = newCredit;
//             console.log(agency.credit);

//             return `Credit changed Successfully`;
//         }
//     }
//     return `Agency not found!`;
// }

// // Test
// console.log(changeCredit("The Auto World", 1000000));

/* ------------- Update the price of a specific car in an agency ------------ */

// carMarket.updateCarPrice = function (agencyName, carNumber, newPrice) {
//     for (const agency of carMarket.sellers) {
//         if (agencyName === agency.agencyName) {
//             for (const currBrand of agency.cars) {
//                 for (let i = 0; i < currBrand.models.length; i++) {
//                     if (currBrand.models[i].carNumber === carNumber) {
//                         currBrand.models[i].price = newPrice;
//                         return `Car Price changed Successfully`;
//                     }
//                 }
//             }
//         }
//     }
//     return `Agency or CarNumber not found!`;
// };

// // Test
// carMarket.updateCarPrice("CarMax","4Ixb0",200000)

/* ------ Calculate and return the total revenue for a specific agency ------ */

// carMarket.getTotalAgencyRevenue = function (agencyName) {
//     let totalRevenue = 0;
//     for (const agency of carMarket.sellers) {
//         if (agencyName === agency.agencyName) {
//             for (const currBrand of agency.cars) {
//                 for (let i = 0; i < currBrand.models.length; i++) {
//                     totalRevenue += currBrand.models[i].price;
//                 }
//             }
//         }
//     }
//     return `The Total revenue of ${agencyName} Agency is : ${totalRevenue}`;
// };

// // Test
// console.log(carMarket.getTotalAgencyRevenue("CarMax"));

/* ---------------- Transfer a car from one agency to another --------------- */

carMarket.transferCarBetweenAgencies = function (
    fromAgency,
    toAgency,
    carNumber
) {
    
    addCarToAgencyInventory(toAgency,brand,car);
    removeCarFromAgencyInventory(fromAgency,brand,car)
};
