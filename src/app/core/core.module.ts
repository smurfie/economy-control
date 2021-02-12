import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { DexieService } from './services/dexie/dexie.service';
import { ProfilesDexieService } from './services/dexie/profiles.dexie.service';
import { ProfilesService } from './services/profiles.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [DexieService, { provide: ProfilesService, useClass: ProfilesDexieService }],
  bootstrap: [],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
