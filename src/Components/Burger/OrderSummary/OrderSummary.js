import React , {Component} from 'react';

import Aux from '../../../hoc/Auxy';
import Button from '../../UI/Button/Button';
class Ordersummary extends Component {

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
            return (
                <li key={igkey}>
                    <span style={{textTransform:'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredinets:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    };
};

export default Ordersummary;