const input = require('fs').readFileSync('./input').toString();
const numbers = input.split('\n').map(Number);

console.log('part 1:',
    numbers
        .filter(n => numbers.includes(2020 - n))
        .map(n => n * (2020 - n))
    [0]
);

console.log('part 2:',
    numbers
        .filter(
            n1 => numbers.some(
                n2 => numbers.includes(2020 - n1 - n2)
            )
        )
        .reduce((acc, curr) => acc * curr)
);