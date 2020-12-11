const input = require('fs').readFileSync('./input').toString();
const lines = input.split('\n').map(a => a.split(''));

const neighborsAdjacent = (i, j, curr) => [
    curr[i][j + 1],
    curr[i][j - 1],
    curr[i + 1] ? curr[i + 1][j]      : '',
    curr[i + 1] ? curr[i + 1][j + 1]  : '',
    curr[i + 1] ? curr[i + 1][j - 1]  : '',
    curr[i - 1] ? curr[i - 1][j]      : '',
    curr[i - 1] ? curr[i - 1][j + 1]  : '',
    curr[i - 1] ? curr[i - 1][j - 1]  : '',
].filter(c => c === '#').length;
const stringify = (arr) => arr.map(a => a.join('')).join('\n');
const reset = (curr) => Array.from({ length: curr.length }, (n, i) => Array.from({ length: curr[i].length }));
const castRay = (fromX, fromY, dirX, dirY, curr) => {
    let char;
    let iter = 0;
    while (!char || char === '.') {
        iter++;
        if (curr[fromY + (iter * dirY)] && curr[fromY + (iter * dirY)][fromX + (iter * dirX)]) { 
            char = curr[fromY + (iter * dirY)][fromX + (iter * dirX)];
        } else {
            break;
        }
    }
    return char;
};
const genRays = (fromX, fromY, curr) => {
    let results = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (j === 0 && i === 0) continue;
            results.push(castRay(fromX, fromY, i, j, curr));
        }
    }
    return results;
}
const neighborsRay = (i, j, curr) => genRays(j, i, curr).filter(c => c === '#').length;
    
const solve = (neighborFn, crowding) => {
    let curr = [...lines];
    let next = reset(curr);

    let changeDetected = true;
    
    while (changeDetected) {
        for (let i = 0; i < curr.length; i++) {
            for (let j = 0; j < curr[i].length; j++) {
                const char = curr[i][j];
                if (char === '.') {
                    next[i][j] = '.';
                    continue;
                }
                const numOfNeighbors = neighborFn(i, j, curr);
                if (char === 'L' && numOfNeighbors === 0) {
                    next[i][j] = '#';
                } else if (char === '#' && numOfNeighbors >= crowding) {
                    next[i][j] = 'L';
                } else {
                    next[i][j] = char;
                }
            }
        }
        changeDetected = stringify(curr) !== stringify(next);
    
        curr = next;
        next = reset(curr);
    }
    
    return [...stringify(curr)].filter(c => c === '#').length;
};

console.log('part 1', solve(neighborsAdjacent, 4));
console.log('part 2', solve(neighborsRay, 5));
