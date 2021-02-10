import React , {Component} from 'react';
import Aux from '../../../hoc/Auxy';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary' ;
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import PropTypes from 'prop-types';
import BurgerIngredient from '../../Burger/BurgerIngredient/BurgerIngredient';
import axios from '../../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {

        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },

        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState  (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]; 
            })
            .reduce((sum , el) => {
                return sum + el;
            } , 0);
        this.setState({purchaseable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice , ingredients: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice , ingredients: updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Mehrdad Yari',
                address: {
                    street: 'Kakh',
                    zipCode: '495959',
                    country: 'Germany'
                },
                email: 'rezaayaari@gmail.com'
          },
          delivaryMethod: 'fastest'
        }
        axios.post('/orders.json' , order)
            .then(response => {
                this.setState({loading: false , purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false , purchasing: false})
            });
    }
 
    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchaseable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

BurgerIngredient.PropTypes = {
    type: PropTypes.string.isRequired
};


export default withErrorHandler(BurgerBuilder , axios);

