import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { assign } from 'lodash';
import { Observable } from 'rxjs';

const DEFAULT_MODAL_OPTIONS: MatDialogConfig<any> = {
  maxHeight: '90vh',
  maxWidth: '90vw',
  role: 'dialog'
};

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private readonly _matDialogService: MatDialog) {}

  open$<TComp, TIn = any, TOut = any>(type: Type<TComp>, data?: TIn, config?: Partial<MatDialogConfig<TIn>>): Observable<TOut> {
    const options = assign({}, DEFAULT_MODAL_OPTIONS, config, { data });
    const dialogRef = this._matDialogService.open<TComp, TIn, TOut>(type, options);
    return dialogRef.afterClosed();
  }
}
