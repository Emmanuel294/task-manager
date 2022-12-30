import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';
import { fromRef } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { UserDocument } from '../types/user/user.document';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signupForm: FormGroup = new FormGroup({});

  public selectedOption: string = 'Login';
  public isLogin: boolean = true;

  // SPINNER
  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value: number = 50;
  public displayProgressSpinner = false;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email],),
      'password': new FormControl(null, [Validators.required]),
    })
  }

  tabChange(row: any) {
    this.selectedOption = row === 1 ? 'Register' : 'Login';
    this.isLogin = !this.isLogin;
    if (row == 1) {
      this.signupForm.addControl('firstName', new FormControl(null, [Validators.required]));
      this.signupForm.addControl('lastName', new FormControl(null, [Validators.required]));
    } else {
      this.signupForm.removeControl('firstName');
      this.signupForm.removeControl('lastName');
    }
  }

  public onSubmit() {
    this.displayProgressSpinner = true;
    const user: UserDocument = {
      email: this.signupForm.get('email')?.value,
      firstName: this.signupForm.get('firstName')?.value,
      id: '',
      lastName: this.signupForm.get('lastName')?.value,
      lastUpdated: 0,
      lastUpdatedBy: '',
    }
    const pwd: string = this.signupForm.get('password')?.value;
    if (!this.isLogin) {
      this.manageSignup(user.email, pwd, user);
      return;
    }
    this.manageLogin(user.email, pwd);

  }

  private async manageLogin(email: string, password: string) {
    await this.authService.login(email, password).then(
      (): void => {
        this.displayProgressSpinner = false;
        setTimeout(
          (): void => {
            this.router.navigate(['/home']);
          },
          1
        );
      }
    ).catch(
      (error: any): void => {
        this.displayProgressSpinner = false;
        this.openDialog('Login', error, 'Close', 'error-class');
      }
    );
  }

  private async manageSignup(email: string, password: string, userDocument: any) {
    await this.authService.signUp(email, password).then(
      async (): Promise<void> => {
        await this.userService.createUser(userDocument);
        this.displayProgressSpinner = false;
        this.openDialog('Signup', 'User Created successfully', 'Close', 'success-class');
        this.manageLogin(email, password);
      }
    ).catch(
      (error: any): void => {
        this.displayProgressSpinner = false;
        this.openDialog('Signup', 'Error trying to create user: ' + error, 'Close', 'error-class');
      }
    );
  }

  private openDialog(title: string, content: string, action: string, style: string) {
    let dialogRef = this.dialog.open(
      DialogComponent,
      {
        data: {
          title: title,
          content: content,
          action: action,
          sendOnClose: action === 'Login' ? true : false,
        },
        backdropClass: style
      }
    );

    dialogRef.afterClosed().subscribe(
      (result): void => {
        console.log(`Dialog result: ${result}`);
        if (result) {
          this.router.navigate(['/login']);
        }
      }
    )

  }

}
