import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UsersService } from 'src/app/core/services/users.service';
import { UniqueUsernameValidatorDirective } from './unique-username.directive';

@Component({
  template: `
    <form>
      <input name="username" type="text" ngModel ecUniqueUsername />
    </form>
  `,
})
class TestComponent {}

describe('component: TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debug: DebugElement;
  let input: DebugElement;

  let usersService: UsersService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [TestComponent, UniqueUsernameValidatorDirective],
    }).createComponent(TestComponent);

    usersService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    input = debug.query(By.css('[name=username]'));
  });

  it('should validate when username do not exists', async () => {
    const username = 'Test1';
    spyOn(usersService, 'exists').and.returnValue(Promise.resolve(false));

    fixture.detectChanges();
    await fixture.whenStable();
    input.nativeElement.value = username;
    input.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const form = debug.children[0].injector.get(NgForm);
    const control = form.control.get('username');

    expect(usersService.exists).toHaveBeenCalledWith(username);
    expect(control?.hasError('uniqueUsername')).toBe(false);
    expect(control?.valid).toBe(true);
  });

  it('should not validate when username exists', async () => {
    const username = 'Test1';
    spyOn(usersService, 'exists').and.returnValue(Promise.resolve(true));

    fixture.detectChanges();
    await fixture.whenStable();
    input.nativeElement.value = username;
    input.nativeElement.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const form = debug.children[0].injector.get(NgForm);
    const control = form.control.get('username');

    expect(usersService.exists).toHaveBeenCalledWith(username);
    expect(control?.hasError('uniqueUsername')).toBe(true);
    expect(control?.valid).toBe(false);
  });
});
