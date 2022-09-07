import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

const materialModules = [MatSelectModule];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MaterialModule {}
