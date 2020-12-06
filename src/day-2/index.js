const input = require('fs').readFileSync('./input').toString();
const pwds = input.split('\n');

// regex approach
{
    let amount = 0;
    for (const pwd of pwds) {
        const match = /(\d+)-(\d+) ([a-z]): ([a-z]+)/g.exec(pwd);
        const [, min, max, char, str] = match;
        const count = (str.match(new RegExp(char, 'g')) || []).length;
        if (count >= min && count <= max) amount++;
    }
    console.log('part 1:', amount);
}


{
    let amount = 0;
    for (const pwd of pwds) {
        const match = /(\d+)-(\d+) ([a-z]): ([a-z]+)/g.exec(pwd);
        const [, index1, index2, char, str] = match;
        if (str[+index1 - 1] === char ^ str[+index2 - 1] === char) amount++;
    }
    console.log('part 2:', amount);
}