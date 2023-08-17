import regionsReducer from '../../../features/regions/regionsSlice';
import { fetchRegions } from '../../../features/regions/regionsThunk';
import { region } from '../../../test-utils/data-factory';
describe('regionsSlice', () => {
  const initialState = {
    regions: null,
    loading: false,
    errorMessage: '',
  };

  it('initialises slice with initialState', () => {
    const regionsSliceInit = regionsReducer(undefined, { type: undefined });
    expect(regionsSliceInit).toEqual(initialState);
  });

  describe('fetchRegions', () => {
    it('should set loading value to true and error message to an empty string when pending', async () => {
      const action = { type: fetchRegions.pending.type };
      const state = { ...initialState, errorMessage: 'error' };
      const afterReducerOperation = regionsReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        loading: true,
        errorMessage: '',
      });
    });

    it('should update state correctly when fetching regions is fulfilled', async () => {
      const returnedRegions = [region(), region()];
      const action = {
        type: fetchRegions.fulfilled.type,
        payload: returnedRegions,
      };
      const state = { ...initialState, loading: true };
      const afterReducerOperation = regionsReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        regions: returnedRegions,
      });
    });

    it('should set loading to true and error message to an empty string when rejected', async () => {
      const action = {
        type: fetchRegions.rejected.type,
        payload: 'There was an error',
      };
      const state = { ...initialState, loading: true };
      const afterReducerOperation = regionsReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        errorMessage: 'There was an error',
      });
    });
  });
});
