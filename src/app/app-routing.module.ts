import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { ShowPostComponent } from './show-post/show-post.component';

const routes: Routes = [
  { path: 'editor', component: CreatePostComponent },
  { path: 'posts/:id', component: ShowPostComponent },
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: '**', redirectTo: '/editor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }