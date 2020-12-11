const input = require('fs').readFileSync('./input').toString();
const pwds = input.split('\n');

// regex approach
{
    let p1 = p2 = 0;
    for (const pwd of pwds) {
        const match = /(\d+)-(\d+) ([a-z]): ([a-z]+)/g.exec(pwd);
        const [, min, max, char, str] = match;
        const count = (str.match(new RegExp(char, 'g')) || []).length;
        if (count >= min && count <= max) p1++;
        if (str[+min - 1] === char ^ str[+max - 1] === char) p2++;
    }
    
    console.log('part 1:', p1);
    console.log('part 2:', p2);
}