const input = require('fs').readFileSync('./input').toString();
const numbers = input.split('\n').map(Number);

let weakness = 0;
main: for (let i = 25; i < numbers.length; i++) {
    const num1 = numbers[i];
    for (let j = i - 25; j < i; j++) {
        const index = numbers.indexOf(num1 - numbers[j]);
        if (index > 0 && index < i) continue main;
    }
    weakness = num1;
    console.log('part 1', weakness);
    break;
}

main: for (let i = 0; i < numbers.length; i++) {
    let acc = numbers[i];
    const arr = [acc];

    for (let j = i + 1; j < numbers.length; j++) {
        const next = numbers[j];
        if (acc + next > weakness) break;

        acc += next;
        arr.push(next);
        if (acc === weakness) {
            const sortedArr = arr.sort((a,b)=>a>b?1:-1)
            console.log('part 2', sortedArr[0] + sortedArr.pop(), i, j-i);
            break main;
        }
    }

}
