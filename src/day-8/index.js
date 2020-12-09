const _ = require('lodash');
const input = require('fs').readFileSync('./input').toString();
const instr = input.split('\n');

const solve = (instructions, correct) => {
    const visitedIndexes = [];
    let acc = 0;
    for (let i = 0; i < instructions.length; i++) {
        const comp = instructions[i].split(" ");
        const instr = comp[0];
        const val = +comp[1];
    
        switch (instr) {
            case "nop":
                if (correct) {
                    const clone = [...instructions];
                    clone[i] = `jmp ${val}`;
                    const res = solve(clone);
                    if (!res.infinite) {
                        console.log(res);
                        return res;
                    }
                }
                
                break;
            case "acc":
                acc += val;
                break;
            case "jmp":
                if (correct) {
                    const clone = [...instructions];
                    clone[i] = `nop ${val}`;
                    const res = solve(clone);
                    if (!res.infinite) {
                        console.log(res);
                        return res;
                    }
                }
                
                i += (val - 1);
                break;
            default:
                // kms
        }
    
        if (visitedIndexes.includes(i)) break;
        visitedIndexes.push(i);
    }
    if (!visitedIndexes.includes(instructions.length - 1)) {
        return {
            val: acc,
            infinite: true
        };
    }
    return { val: acc, infinite: false};
};

console.log('part 1:', solve(instr).val);
console.log('part 2:', solve(instr, true).val);

