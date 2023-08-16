import farmsReducer from '../../../features/farms/farmsSlice';
import { fetchActiveFarms } from '../../../features/farms/farmsThunk';
import { farm } from '../../../test-utils/data-factory';

describe('farmsSlice', () => {
  const initialState = {
    farms: null,
    loading: false,
    errorMessage: '',
  };

  it('initialises slice with initialState', () => {
    const farmsSliceInit = farmsReducer(undefined, { type: undefined });
    expect(farmsSliceInit).toEqual(initialState);
  });

  describe('fetchActiveFarms', () => {
    it('should set loading value to true and error message to an empty string when pending', async () => {
      const action = { type: fetchActiveFarms.pending.type };
      const state = { ...initialState, errorMessage: 'error' };
      const afterReducerOperation = farmsReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        loading: true,
        errorMessage: '',
      });
    });

    it('should update state correctly when fetching active farms is fulfilled', async () => {
      const returnedFarms = [farm(), farm()];
      const action = {
        type: fetchActiveFarms.fulfilled.type,
        payload: returnedFarms,
      };
      const state = { ...initialState, loading: true };
      const afterReducerOperation = farmsReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        farms: returnedFarms,
      });
    });

    it('should set loading to true and error message to an empty string when rejected', async () => {
      const action = {
        type: fetchActiveFarms.rejected.type,
        payload: 'There was an error',
      };
      const state = { ...initialState, loading: true };
      const afterReducerOperation = farmsReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        errorMessage: 'There was an error',
      });
    });
  });
});
