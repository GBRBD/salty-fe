import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { EditStoryComponent } from './edit-story/edit-story.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateStoryComponent } from './create-story/create-story.component';
import { StoryListComponent } from './story/story-list/story-list.component';

import { AuthGuard } from './core/guards/guard';
import { StoryResolver } from './core/resolvers/story.resolver';
import { MyStoriesComponent } from './story/my-stories/my-stories.component';
import { SettingsComponent } from './settings/settings.component';
import { StoryComponent } from './story/story/story.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'mystories',
    component: MyStoriesComponent,
    canActivate: [AuthGuard]
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 's/create',
    component: CreateStoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 's/edit/:id',
    component: EditStoryComponent,
    resolve: { story: StoryResolver },
    canActivate: [AuthGuard]
  },
  {
    path: 's/:id',
    component: StoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
