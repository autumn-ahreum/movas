import { createSlice, configureStore } from '@reduxjs/toolkit'

const myListSlice = createSlice({
    name: 'myList',
    initialState : [],
    reducers: {
        addToList : (state, newMovie) => {
            return [...state.myList, newMovie]
        } 
    }
})

export let { addToList } = myListSlice.actions

export default configureStore({
    reducer: {
        myList : myListSlice.reducer
    }
})
