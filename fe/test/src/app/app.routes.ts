import { Routes } from '@angular/router';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { Comp3Component } from './comp3/comp3.component';
import { Comp4Component } from './comp4/comp4.component';
import { Comp5Component } from './comp5/comp5.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'comp1', component: Comp1Component },
  { path: 'comp2', component: Comp2Component },
  { path: 'comp3', component: Comp3Component },
  { path: 'comp4', component: Comp4Component },
  { path: 'comp5', component: Comp5Component },
  { path: '', component: LoginComponent },
];
