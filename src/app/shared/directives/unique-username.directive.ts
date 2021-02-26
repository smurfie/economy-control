import { Directive, forwardRef, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private usersService: UsersService) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.usersService.exists(ctrl.value).then((exists) => (exists ? { uniqueUsername: true } : null));
  }
}

@Directive({
  selector: '[ecUniqueUsername]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUsernameValidator),
      multi: true,
    },
  ],
})
export class UniqueUsernameValidatorDirective {
  constructor(private validator: UniqueUsernameValidator) {}

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
