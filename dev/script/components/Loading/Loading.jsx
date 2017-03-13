import React, {Component} from 'react';
import classNames from 'classnames';

import scss from './Loading.scss';

export default class Loading extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    render() {
        return (
            <div className={scss.Loading}>
                <div className={scss['loading-container']}></div>
            </div>
        );
    }
}
