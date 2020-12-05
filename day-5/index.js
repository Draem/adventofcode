const input = require('fs').readFileSync('./input').toString();
const passes = input.split('\n');
const passToBin = (pass) => parseInt(pass.replace(/B|R/g, 1).replace(/F|L/g, 0), 2);

{
    console.log('part 1:', passes.map(
        passToBin
    ).sort(
        (a, b) => a > b ? -1 : 1
    )[0]);
}

{ 
    const sortedPasses = passes.map(
        passToBin
    ).sort(
        (a, b) => a > b ? 1 : -1
    );

    console.log('part 2:', sortedPasses.filter(
        (x, i) => x ^ (sortedPasses[i + 1] - 1)
    )[0] + 1);
}
