import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

const COMPONENTS = [];

@NgModule({
  imports: [SharedModule],
  declarations: [...COMPONENTS],
})
export class CampusModule {}
