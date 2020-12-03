const input = require('fs').readFileSync('./input').toString();
const lines = input.split('\n');

{
    let tree = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        tree += line[i * 3 % line.length] === '#' ? 1 : 0;
    }
    console.log('part 1:', tree);
}

{
    let trees = [0,0,0,0,0];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        trees[0] += line[i % line.length] === '#' ? 1 : 0;
        trees[1] += line[i * 3 % line.length] === '#' ? 1 : 0;
        trees[2] += line[i * 5 % line.length] === '#' ? 1 : 0;
        trees[3] += line[i * 7 % line.length] === '#' ? 1 : 0;

        line = lines[i * 2];
        if (line) trees[4] += line[i % line.length] === '#' ? 1 : 0;
    }
    console.log('part 2:', trees.reduce((acc, curr) => acc * curr));
}

