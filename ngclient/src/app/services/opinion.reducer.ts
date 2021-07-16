import { Opinion } from './../models/Opinion';
import { createReducer, on } from '@ngrx/store';
import { 
    getOpinions,
    getOpinionsSuccess,
    addOpinions,
    addOpinionsSuccess
} from './../actions/opinion.action';

export interface OpinionState {
  opinions: ReadonlyArray<Opinion>;
}

const initialState: ReadonlyArray<Opinion> = [];

export const opinionReducer = createReducer(
  initialState,
  on(getOpinionsSuccess, (state, { opinions }) => [...opinions]),
  on(addOpinionsSuccess, (state, { opinions }) => [...state, opinions])
);