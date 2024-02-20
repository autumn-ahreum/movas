import { createSlice, configureStore } from '@reduxjs/toolkit'

const myListSlice = createSlice({
    name: 'myList',
    initialState : [],
    reducers: {
        addToList : state => {
            
        } 

    }
})

export default configureStore({
    reducer: {
        myList : myListSlice.reducer
    }
})
