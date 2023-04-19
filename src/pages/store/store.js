import { configureStore } from '@reduxjs/toolkit';
import interactions from './reducers/interactions';
import order from './reducers/order';
import merchant from './reducers/merchant';
import options from './reducers/options';


//Para cada caso que queremos usar podemos crear un reducer. Por ejemplo por temas. Payment, User, etc
export const store = configureStore({
    reducer: {
        order: order,
        interactions: interactions,
        merchant: merchant,
        options: options
    }
})