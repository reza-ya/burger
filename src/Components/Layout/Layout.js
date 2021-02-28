import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxy';
import Classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    render () {
        return (
            <Aux>
                <Toolbar
                isAuth={this.props.isAuthenticated}
                DrawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                isAuth={this.props.isAuthenticated} 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);

