import { IAction } from '../ducks.d';

interface State {
  isLoading: boolean;
}

export const initState: State = {
  isLoading: false
};

export default function(state: State = initState, action: IAction): State {
  switch (action.type) {
    default:
      return state;
  }
}
