import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDividerModule, MatIconModule } from '@angular/material';
import { TranslateModule as NgxTranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [],
  declarations: [],
  exports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, NgxTranslateModule]
})
export class SharedModule {}
