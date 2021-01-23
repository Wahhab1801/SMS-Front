import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CampusService } from './services/campus.service';

const COMPONENTS = [];

@NgModule({
  imports: [SharedModule],
  declarations: [...COMPONENTS],
})
export class CampusModule {}
