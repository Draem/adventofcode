const input = require('fs').readFileSync('./input').toString();
const numbers = input.split('\n').map(Number);

const lines = numbers.sort((a, b) => a > b ? 1 : -1);
lines[lines.length] = lines[lines.length - 1] + 3;

// diffs
let c1 = 0;
let c3 = 0;

const adapters = lines.slice();
for (let prev = 0, curr = 0;curr = adapters.shift();prev=curr) {
    if (curr - prev === 1) c1++;
    if (curr - prev === 3) c3++;
}

console.log('part 1', c1 * c3);

const cache = [];
const solve = (voltage, adapters) => {
    if (cache[[voltage, adapters]]) return cache[[voltage, adapters]]
    if(adapters.length === 0) return 1;
    let options = 0;
    if(adapters[0] <= voltage + 3) options += solve(adapters[0], adapters.slice(1));
    if(adapters[1] <= voltage + 3) options += solve(adapters[1], adapters.slice(2));
    if (adapters[2] <= voltage + 3) options += solve(adapters[2], adapters.slice(3));
    cache[[voltage, adapters]] = options;
    return options;
}

console.log('part 2', solve(0, lines));
