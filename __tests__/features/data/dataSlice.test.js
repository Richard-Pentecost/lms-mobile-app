import dataReducer, {
  clearErrors,
  clearSuccessFlag,
} from '../../../features/data/dataSlice';
import { addDataCreatorFn, updateData } from '../../../features/data/dataThunk';

describe('dataSlice', () => {
  const initialState = {
    loading: false,
    errorMessage: '',
    addDataSuccess: false,
  };

  it('initialises slice with initial state', () => {
    const dataSliceInit = dataReducer(undefined, { type: undefined });
    expect(dataSliceInit).toEqual(initialState);
  });

  describe('clearErrors', () => {
    it('should set the errorMessage to a blank string in state', () => {
      const state = { ...initialState, errorMessage: 'There is an error' };
      const afterReducerOperation = dataReducer(state, clearErrors());

      expect(afterReducerOperation).toEqual(initialState);
    });
  });

  describe('clearSuccessFlag', () => {
    it('should set addDataSuccess to false in state', () => {
      const state = { ...initialState, addDataSuccess: true };
      const afterReducerOperation = dataReducer(state, clearSuccessFlag());

      expect(afterReducerOperation).toEqual(initialState);
    });
  });

  describe('addDataCreatorFn', () => {
    it('should set loading to true, the error message to an empty string and the addDataSuccess flag to false when pending', () => {
      const action = { type: addDataCreatorFn.pending.type };
      const state = {
        ...initialState,
        errorMessage: 'Some error',
        addDataSuccess: true,
      };
      const afterReducerOperation = dataReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('should set loading to false and the addDataSuccess flag to true when fulfilled', () => {
      const action = { type: addDataCreatorFn.fulfilled.type };
      const state = {
        ...initialState,
        loading: true,
        addDataSuccess: false,
      };
      const afterReducerOperation = dataReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        addDataSuccess: true,
      });
    });

    it('should set loading to false and the error message to the error returned when rejected', () => {
      const action = {
        type: addDataCreatorFn.rejected.type,
        payload: 'There was an error',
      };
      const state = {
        ...initialState,
        errorMessage: '',
        loading: true,
      };
      const afterReducerOperation = dataReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        errorMessage: 'There was an error',
      });
    });
  });

  describe('updateData', () => {
    it('should set loading to true, the error message to an empty string and the addDataSuccess flag to false when pending', () => {
      const action = { type: updateData.pending.type };
      const state = {
        ...initialState,
        errorMessage: 'Some error',
        addDataSuccess: true,
      };
      const afterReducerOperation = dataReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('should set loading to false and the addDataSuccess flag to true when fulfilled', () => {
      const action = { type: updateData.fulfilled.type };
      const state = {
        ...initialState,
        loading: true,
        addDataSuccess: false,
      };
      const afterReducerOperation = dataReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        addDataSuccess: true,
      });
    });

    it('should set loading to false and the error message to the error returned when rejected', () => {
      const action = {
        type: updateData.rejected.type,
        payload: 'There was an error',
      };
      const state = {
        ...initialState,
        errorMessage: '',
        loading: true,
      };
      const afterReducerOperation = dataReducer(state, action);
      expect(afterReducerOperation).toEqual({
        ...initialState,
        errorMessage: 'There was an error',
      });
    });
  });
});
