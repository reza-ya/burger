import React , {Component} from 'react';
import classes from './Orders.module.css';
import Order from '../../Order/Order';
import axios from '../../../axios-orders';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [] , 
        loading: true
    }
    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrder = [];
                for (let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading:false , orders: fetchedOrder});
                console.log(fetchedOrder)
            })
            .catch(error => {
                this.setState({loading:false});
            })
    }
    render () {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                })}
            </div>
        )
    }
}

export default WithErrorHandler(Orders , axios);