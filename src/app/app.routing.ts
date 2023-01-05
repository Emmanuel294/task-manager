/* ••[1]••••••••••••••••••••••••• app.routing.ts •••••••••••••••••••••••••••••• */

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'home', canActivate: [AuthGuard], component: HomeComponent
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