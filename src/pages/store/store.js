import { configureStore } from '@reduxjs/toolkit';
import interactions from './reducers/interactions';
import order from './reducers/order';
import sample from './reducers/sample';


//Para cada caso que queremos usar podemos crear un reducer. Por ejemplo por temas. Payment, User, etc
export const store = configureStore({
    reducer: {
        sample: sample,
        order: order,
        interactions: interactions
    }
})