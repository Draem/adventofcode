const _ = require('lodash');
const input = require('fs').readFileSync('./input').toString();
const groups = input.split('\n\n');

{
    console.log('part 1:',
        groups.map(
            group => new Set(
                [...group
                    .split('\n')
                    .join("")]
            ).size
        ).reduce(
            (a, b) => a + b
        )
    );
}

{
    console.log('part 2:',
        groups.map(
            group => _.intersection(
                ...group
                    .split('\n')
                    .map(
                        x => [...x]
                    )
                ).length
        ).reduce(
            (a, b) => a + b
        )
    );
}


