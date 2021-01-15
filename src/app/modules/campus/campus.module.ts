import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CampusService } from './services/Campus.service';

const COMPONENTS = [];

@NgModule({
  imports: [SharedModule],
  declarations: [...COMPONENTS],
})
export class CampusModule {}
