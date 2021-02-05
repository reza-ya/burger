import React, {Component} from 'react';
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
                <Toolbar DrawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;

