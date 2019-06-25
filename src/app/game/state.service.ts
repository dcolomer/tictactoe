import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turno: string,
  valores: string[][],
  movimientos: number,
  ganador: boolean
}


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() {
    this._state$ = new BehaviorSubject({
      turno: 'PLAYERX',
      valores:[
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      movimientos: 0,
      ganador: false
    });
  }

  get state$(): BehaviorSubject<State> {
    return this._state$;
  }

  get state(): State {
    return this._state$.getValue();
  }

  set state(state: State) {
    this._state$.next(state);
  }

  updateValue(row, col) {
    if(this.state.valores[row][col] === '-') {
      this.state.movimientos++;
      let newValue = this.state.turno === 'PLAYERX' ? 'X' : '0';
      this.state.valores[row][col] = newValue;

      let winner: boolean = this.checkWinner(newValue);

      if (!winner) {
        let newTurn = this.state.turno === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
        this.state.turno = newTurn;
      } else {
        this.state.ganador = true;
      }
    }
  }

  reset() {
    this.state = {
      turno: 'PLAYERX',
      valores:[
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      movimientos: 0,
      ganador: false
    };
  }

  private checkWinner(value: string): boolean {

    const matriz = this.state.valores;

    // mirar en las 3 filas
    for(let fila=0; fila<3; fila++) {
      if (matriz[fila][0] === value && matriz[fila][1] === value && matriz[fila][2] === value) return true;
    }

    // mirar en las 3 columnas
    for(let col=0; col<3; col++) {
      if (matriz[0][col] === value && matriz[1][col] === value && matriz[2][col] === value) return true;
    }

    // mirar en las 2 diagonales
    if (matriz[0][0] === value && matriz[1][1] === value && matriz[2][2] === value) return true;
    if (matriz[2][0] === value && matriz[1][1] === value && matriz[0][2] === value) return true;

    return false;
  }
}
