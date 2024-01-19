import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const colorSlice = createSlice({
    name: 'color',
    initialState: {
        isColorFormOpen: false,
        noteColor: '#faaa73',
    },
    reducers: {
        openColorForm: (state) => {
            state.isColorFormOpen = true;
        },
        closeColorForm: (state) => {
            state.isColorFormOpen = false;
        },
        setNoteColor: (state, action: PayloadAction<string>) => {
            state.noteColor = action.payload
        },
    },
});

export const { openColorForm, closeColorForm, setNoteColor } = colorSlice.actions;
export default colorSlice.reducer;
