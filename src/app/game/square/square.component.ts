import {Component, Input, OnInit} from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  @Input() row: number;
  @Input() col: number;

  private _stateService: StateService;

  constructor(stateService: StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {
  }

  handleSquareClick() {
    console.log("Square click", this.row, this.col);
    this._stateService.updateValue(this.row, this.col);
  }

}
