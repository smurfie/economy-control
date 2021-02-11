import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DexieService } from './dexie.service';
import { ProfilesService } from './profiles.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [DexieService, ProfilesService],
  bootstrap: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
