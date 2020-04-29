import {createSelector} from 'reselect';

const selectData = state => state.data;

export const selectDataScreams = createSelector(
    [selectData],
    (data) => data.screams
);
export const selectDataLoading = createSelector(
    [selectData],
    (data) => data.loading
);