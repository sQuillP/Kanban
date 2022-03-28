import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { HomeComponent } from './home/home.component';
import { KanbanComponent } from './kanban/kanban.component';

const routes: Routes = [
  {path: "home", component:HomeComponent },
  {path: "new-project", component: CreateProjectComponent},
  {path: "kanban/:key", component: KanbanComponent},
  {path: "", redirectTo: "/home", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
