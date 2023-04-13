import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'rochi'
}

export const sampleSlice = createSlice({
    name: 'sample',
    initialState, //hay que pasarle un estado inicial, que se reinicia al recargar la pagina. Si no queremos esto va a haber que investigar redux-persist (Que lo usamos pero queremos cambiarlo)
    reducers: {
        //cada vez que quiero modificar un parametro (o todo el estado) puedo crear una funcion
      setName: (state, action) => {
        state.name = action.payload
      },
    }
  })
  
  export const { setName } = sampleSlice.actions;
  
  export default sampleSlice.reducer;