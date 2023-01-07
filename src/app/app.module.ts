import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.modules';
import { LoginComponent } from './login/login.component';
import { AppRouting } from './app.routing';
import { FormsModules } from './modules/forms.module';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { AppOverlayModule } from './modules/overlay/overlay.module';
import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from './header/header.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectComponent } from './project/project.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskComponent } from './task/task.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProgressSpinnerComponent,
    DialogComponent,
    HeaderComponent,
    ProjectFormComponent,
    ProjectComponent,
    TaskFormComponent,
    TaskComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    AppOverlayModule,
    AngularFireModule.initializeApp(
      environment,
      environment.projectId,
    ),
    AngularFirestoreModule,
    AppRouting,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModules,
    HttpClientModule,
    MaterialModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
