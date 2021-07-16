import { createAction, props } from '@ngrx/store';
import { Opinion } from '../models/Opinion';

export const getOpinions = createAction('[Opinion] Get opinions');
export const getOpinionsSuccess = createAction(
  '[Opinion] Get opinions success',
  (opinions: ReadonlyArray<Opinion>) => ({ opinions })
  // props<{ movies: ReadonlyArray<Movie> }>()
);
export const addOpinions = createAction(
  '[Opinion] Add opinions',
  (opinions: Opinion) => ({ opinions })
  // props<{ movie: Movie }>()
);
export const addOpinionsSuccess = createAction(
  '[Opinion] Add opinions success',
  // props<{ movie: Movie }>(),
  (opinions: Opinion) => ({ opinions })
);