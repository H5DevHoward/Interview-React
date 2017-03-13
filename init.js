const fs = require('fs');

const TYPE = process.argv[2]; // component's TYPE['vue', 'react']
const NAME = process.argv[3]; // component's NAME
let html, js, component;

// parse insert name
function camelToLine() {
    const line = NAME.replace(/([A-Z])/g, '-$1').toLowerCase();
    const tmp = line.split('');

    if (tmp[0] === '-') {
        tmp.shift();

        return tmp.join('');
    }

    return line;
}

// init vue template function
function initVueTemplate() {
    html =
`<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <title>Demo</title>
</head>

<body>
    <div id="root">
        <app></app>
    </div>

    <script src="main.js"></script>
</body>

</html>`;

    js =
`import 'babel-polyfill';
import Vue from 'vue';
import App from './components/App.vue';

const app = new Vue({
    components: {
        App,
    },
}).$mount('#root');
`;

    const app =
`<template>
    <div class="wrapper">
        <${camelToLine()} />
    </div>
</template>

<script>
import ${NAME} from './${NAME}.vue';

export default {
    components: {
        ${NAME},
    },
};
</script>

<!-- <style lang="scss"></style> -->
<!-- <style lang="scss" rel="stylesheet/scss" src="../style/style.scss"></style> -->`;

    component =
`<template>

</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
</style>`;

    if (fs.existsSync('dev/script/components/App.vue')) {
        console.log('========== App.vue component exist ==========');
    } else {
        fs.writeFileSync('dev/script/components/App.vue', app);
    }
    if (fs.existsSync(`dev/script/components/${NAME}.vue`)) {
        console.log(`========== ${NAME}.vue component exist ==========`);
    } else {
        fs.writeFileSync(`dev/script/components/${NAME}.vue`, component);
    }
}


// init react template function
function initReactTemplate() {
    html =
`<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <title>Demo</title>
</head>

<body>
    <div id="root">
    </div>

    <script src="main.js"></script>
</body>

</html>`;

    js =
`import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ${NAME} from './components/${NAME}';

ReactDOM.render(
    <div className="app">
        <${NAME} />
    </div>,
    document.getElementById('root')
);
`;

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

if (TYPE === 'vue') initVueTemplate();
if (TYPE === 'react') initReactTemplate();

if (fs.existsSync('dev/index.html')) {
    console.log('========== index.html file exist ==========');
} else {
    fs.writeFileSync('dev/index.html', html);
}
if (fs.existsSync('dev/script/index.js')) {
    console.log('========== index.js file exist ==========');
} else {
    fs.writeFileSync('dev/script/index.js', js);
}
