import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        isFormOpen: false,
        isUpdateFormOpen: false,
    },
    reducers: {
        openForm: (state) => {
            state.isFormOpen = true;
        },
        closeForm: (state) => {
            state.isFormOpen = false;
        },
        openUpdateForm: (state) => {
            state.isUpdateFormOpen = true;
        },
        closeUpdateForm: (state) => {
            state.isUpdateFormOpen = false;
        },
    },
});

export const { openForm, closeForm, openUpdateForm, closeUpdateForm } = formSlice.actions;
export default formSlice.reducer;
