import myCurrentLocation, { message, name, getGreeting } from "./myModule";
import myAddition, { subtraction } from "./math";

console.log(message);
console.log(name);
console.log(myCurrentLocation);
console.log(getGreeting("Jessica"));

console.log(myAddition(5, 9));
console.log(subtraction(8, 3));
