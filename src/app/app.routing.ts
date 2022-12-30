/* ••[1]••••••••••••••••••••••••• app.routing.ts •••••••••••••••••••••••••••••• */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./guards/auth.guard";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'home', canActivate: [AuthGuard], component: AppComponent
    },
]

@NgModule(
    {
        exports: [RouterModule],
        imports: [RouterModule.forRoot(
            appRoutes
        )],
    }
)
export class AppRouting {

}