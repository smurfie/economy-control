import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserPropertiesService } from 'src/app/core/services/user-properties.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserPropertyConstants } from 'src/app/shared/models/user-property.model';

@Component({
  selector: 'ec-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  readonly CURRENCY_MAX_LENGTH = UserPropertyConstants.CURRENCY_MAX_LENGTH;

  userId: number | undefined;
  isLoading = true;
  isSaving = false;

  settingsForm = this.formBuilder.group({
    currency: ['', [Validators.required, Validators.maxLength(3)]],
  });

  get currency() {
    return this.settingsForm.get('currency');
  }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private userPropertiesService: UserPropertiesService
  ) {
    this.usersService.getUserIdLoggedIn().then((userId) => {
      this.userId = userId;
      this.userPropertiesService.getCurrency(this.userId!).then((currency) => {
        this.settingsForm.patchValue({ currency: currency });
        this.isLoading = false;
      });
    });
  }

  async save() {
    this.isSaving = true;
    this.userPropertiesService.setCurrency(this.userId!, this.currency!.value);
    this.isSaving = false;
  }
}
