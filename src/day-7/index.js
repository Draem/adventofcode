const _ = require('lodash');
const input = require('fs').readFileSync('./input').toString();
const rules = input.split('\n');

const bagMap = {};

const count = (target, bags) => bags.filter(bag => bagMap[bag.value || bag].some(bag => bag.value === target) || count(target, bagMap[bag.value || bag])).length;

const contains = (target) => { 
    const subBags = bagMap[target.value];
    if (subBags.length === 0) return target.count;
    
    return (target.count || 0) + subBags.map(bag => (target.count || 1) * contains(bag)).reduce((a,b)=>a+b);
};

for (const rule of rules) {
    //
    let [containee, itemsStr] = rule.split(" contain ");
    containee = containee.replace(/\sbags?/, '');
    if (itemsStr === "no other bags.") {
        bagMap[containee] = [];
    } else {
        const items = itemsStr.replace('.', '').split(", ").map(item => {
            const count = +/([0-9]+)\s/.exec(item)[0];
            const value = item.replace(/([0-9]+\s)|(\sbags?)/g, '')
            return {
                value,
                count
            };
        });
        bagMap[containee] = _.flatten(items);
    }
}


console.log('part 1', count("shiny gold", Object.keys(bagMap)));
console.log('part 2', contains({ value: "shiny gold" }));