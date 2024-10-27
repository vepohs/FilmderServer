const greet = (name: string): string => {
    return `Bonjour, ${name}!`;
};

const addition = (a: number, b: number): number => {
    return a + b;
}
console.log(greet('Monde'));


let myNumber: number;
console.log(addition(2, 3));

myNumber = addition(2, 3);
console.log(myNumber);
console.log(myNumber);

