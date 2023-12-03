import farmsReducer, {
  clearSelectedFarm,
  selectedFarm,
} from '../../../features/farms/farmsSlice';
import { fetchActiveFarmsCreatorFn } from '../../../features/farms/farmsThunk';
import { farm } from '../../../test-utils/data-factory';

describe('farmsSlice', () => {
  const initialState = {
    farms: null,
    loading: false,
    errorMessage: '',
    selectedFarm: null,
  };

  it('initialises slice with initialState', () => {
    const farmsSliceInit = farmsReducer(undefined, { type: undefined });
    expect(farmsSliceInit).toEqual(initialState);
  });

  describe('reducers', () => {
    const farm1 = { ...farm(), uuid: 'uuid1' };
    const farm2 = { ...farm(), uuid: 'uuid2' };
    const farms = [farm1, farm2];

    describe('selectedFarms', () => {
      it('should set the selectedFarm to the farm with the correct id', () => {
        const state = { ...initialState, farms };
        const afterReducerOperation = farmsReducer(
          state,
          selectedFarm('uuid1')
        );
        expect(afterReducerOperation).toEqual({
          ...state,
          selectedFarm: farm1,
        });
      });
    });

    describe('clearSelectedFarm', () => {
      it('should set the selectedFarm to null', () => {
        const state = { ...initialState, farms, selectedFarm: farm1 };
        const afterReducerOperation = farmsReducer(state, clearSelectedFarm());
        expect(afterReducerOperation).toEqual({ ...state, selectedFarm: null });
      });
    });
  });

  describe('extraReducer', () => {
    describe('fetchActiveFarms', () => {
      it('should set loading value to true and error message to an empty string when pending', async () => {
        const action = { type: fetchActiveFarmsCreatorFn.pending.type };
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
          type: fetchActiveFarmsCreatorFn.fulfilled.type,
          payload: returnedFarms,
        };
        const state = { ...initialState, loading: true };
        const afterReducerOperation = farmsReducer(state, action);
        expect(afterReducerOperation).toEqual({
          ...initialState,
          farms: returnedFarms,
        });
      });

      it('should set loading to true and error message to the error returned when rejected', async () => {
        const action = {
          type: fetchActiveFarmsCreatorFn.rejected.type,
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
});
