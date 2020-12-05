const input = require('fs').readFileSync('./input').toString();
const passports = input.trim().split('\n\n');

const fields = {
    'byr': (str) => +str >= 1920 && +str <= 2002,
    'iyr': (str) => +str >= 2010 && +str <= 2020,
    'eyr': (str) => +str >= 2020 && +str <= 2030,
    'hgt': (str) => { 
        const num = +str.substr(0, str.length - 2);
        if (str.endsWith('cm')) {
            return num >= 150 && num <= 193;
        } else if (str.endsWith('in')) {
            return num >= 59 && num <= 76;
        }
    },
    'hcl': (str) => /#[a-f0-9]{6}/i.test(str),
    'ecl': (str) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(str),
    'pid': (str) => /^[0-9]{9}$/i.test(str)
};
{
    let total = 0;
    for (const passport of passports) {
        let i = true;
        Object.keys(fields).forEach(field => i &= passport.includes(field + ":"));
        total += i;
    }
    console.log('part 1:', total, '/', passports.length);
}

{
    let total = 0;
    for (const passport of passports) {
        const passportFields = passport.trim().split(/\s+/g);
        const set = new Set();
        let i = true;
        for (const field of passportFields) {
            const [name, val] = field.trim().split(':');
            // ignore shit
            if (name === 'cid') continue;
            i &= fields[name](val);
            set.add(name);
        }
        i &= (set.size === 7);
        total += i;
    }
    console.log('part 2:', total, '/', passports.length);
}