import { 
    getOpinions,
    getOpinionsSuccess,
    addOpinions,
    addOpinionsSuccess
} from './../actions/opinion.action';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EmptyError } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class OpinionEffects {

    loadOpinions$ = createEffect(() =>
        this.action$.pipe(
        ofType(getOpinions),
        exhaustMap(() =>
            this.auth.getOpinionsTest().pipe(
            map((opinions) => getOpinionsSuccess(opinions))
            )
        )
        )
    );

    addOpinion$ = createEffect(() =>
        this.action$.pipe(
        ofType(addOpinions),
        tap((opinion) => console.log(opinion)),
        concatMap(({ opinions }) =>
        this.auth.addOpinionsTest(opinions).pipe(
            map((newOpinion) => addOpinionsSuccess(newOpinion))
            )
        )
        )
    );

  constructor(private action$: Actions, private auth: AuthService) {}
}