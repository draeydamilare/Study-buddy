import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
    totalScore:0,
    title: '',
    _id:''
}

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload.questions
            state.title=  action.payload.title,
            state._id= action.payload._id
        },  

        clearQuestions: (state) => {
            state._id = ''
            state.questions= [],
            state.title = "",
            state.totalScore = 0
        }
    }
})

export const {setQuestions, clearQuestions} = questionSlice.actions;
export default questionSlice.reducer