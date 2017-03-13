const fs = require('fs');

const TYPE = process.argv[2]; // component's TYPE['vue', 'react']
const NAME = process.argv[3]; // component's NAME

function generateVueComponent() {
    const component =
`<template>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>`;

    if (fs.existsSync(`dev/script/components/${NAME}.vue`)) {
        console.log(`========== ${NAME}.vue component exist ==========`);
    } else {
        fs.writeFileSync(`dev/script/components/${NAME}.vue`, component);
    }
}

function generateReactComponent() {
    const entry =
`import ${NAME} from './${NAME}.jsx';

export default ${NAME};
`;

    const jsx =
`import React, {Component} from 'react';
import classNames from 'classnames';

import scss from './${NAME}.scss';

export default class ${NAME} extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    render() {
        return (
            <div className={scss.${NAME}}>

            </div>
        );
    }
}
`;

    const scss = `.${NAME} {}`;

    if (fs.existsSync(`dev/script/components/${NAME}`)) {
        console.log(`========== ${NAME} folder exist ==========`);
    } else {
        fs.mkdirSync(`dev/script/components/${NAME}`);
        fs.writeFileSync(`dev/script/components/${NAME}/index.js`, entry);
        fs.writeFileSync(`dev/script/components/${NAME}/${NAME}.jsx`, jsx);
        fs.writeFileSync(`dev/script/components/${NAME}/${NAME}.scss`, scss);
    }
}

if (fs.existsSync('dev/script/components')) {
    console.log('========== components folder exist ==========');
} else {
    fs.mkdirSync('dev/script/components');
}

if (TYPE === 'vue') generateVueComponent();
if (TYPE === 'react') generateReactComponent();
