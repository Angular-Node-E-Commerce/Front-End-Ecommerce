import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ErrorComponent } from './pages/error/error.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { CartComponent } from './components/cart/cart.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

import { EditCategoryComponent } from './admin/components/edit-category/edit-category.component';
import {  AddCategryComponent } from './admin/components/add-categry/add-categry.component';
import { CategoriesComponent } from './admin/pages/admin-categories/categories.component';
import { AdminPageComponent } from './admin/pages/admin-page/admin-page.component';
import { AdminUsersComponent } from './admin/pages/admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin/pages/admin-orders/admin-orders.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthGuard } from './guadrs/auth.guard';
import { AdminGuard } from './guadrs/admin.guard';


export const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    title : 'home'
  },
  {
    path:'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path:'forget-password',
    component: ForgetPasswordComponent,
    title: 'Forget Password'
  },
  {
    path:'reset-password',
    component: ResetPasswordComponent,
    title: 'Reset Password'
  },
  {
    path:'sign-up',
    component: SignUpComponent,
    title: 'Sign Up'
  },
  {
    path:'games-page',
    component: GamesPageComponent,
    title: 'Games Page'
  },
  {
    path: 'game-details/:id',
    component: GameDetailsComponent,
    title: 'Game details',
  },
  {
    path: 'admin-categories',
    component: CategoriesComponent,
    title: 'Categories',
  },{
    path: 'edit-category/:id',
    component: EditCategoryComponent,
    title: 'Edit Category',
  },
  {
    path : 'cart',
    component:  CartComponent,
    title: 'Cart'
  },
  {
    path:'user-profile',
    component: UserProfileComponent,
    title:'Profile Page'

  },
  {
    path:'add-category',
    component: AddCategryComponent,
    title:'Add Category'
  },
  {
    path:'admin-page',
    component: AdminPageComponent,
    // title:'Admin Page', canActivate: [AuthGuard]
    title:'Admin Page',
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path:'admin-users',
    component: AdminUsersComponent,
    title:'Admin Users'

  },
  {
    path:'admin-orders',
    component: AdminOrdersComponent,
    title:'Admin Orders'
  },
  {
    path:'**',
    component: ErrorComponent,
    title: 'Error'
  }

];
