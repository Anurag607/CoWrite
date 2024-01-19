import { createSlice } from '@reduxjs/toolkit';

const deleteSlice = createSlice({
    name: 'delete',
    initialState: {
        isDeleteFormOpen: false,
    },
    reducers: {
        openDeleteForm: (state) => {
            state.isDeleteFormOpen = true;
        },
        closeDeleteForm: (state) => {
            state.isDeleteFormOpen = false;
        },
    },
});

export const { openDeleteForm, closeDeleteForm } = deleteSlice.actions;
export default deleteSlice.reducer;
