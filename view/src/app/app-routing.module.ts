import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootGuard } from './core/guard/root.guard';

const routes: Routes = [
  {
    path: 'dev',
    loadChildren: () => import('./dev/dev.module').then(m => m.DevModule),
  },
  {
    path: 'content',
    loadChildren: () => import('./content/content.module').then(m => m.ContentModule),
  },
  {
    path: 'logger',
    loadChildren: () => import('./logger/logger.module').then(m => m.LoggerModule),
    canActivate: [RootGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
