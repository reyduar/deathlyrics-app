// ====== ariel duarte ======
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from "./components/home/list.component";
import { AddComponent } from "./components/add/add.component";
import { DetailsComponent } from "./components/detail/details.component";
import { AboutComponent } from "./components/about/about.component";

const appRoutes: Routes = [
	{	path: '',	component: ListComponent	},
	{ path: "home", component: ListComponent },
	{ path: "add", component: AddComponent },
	{ path: "details/:id", component: DetailsComponent },
	{ path: "edit/:id", component: AddComponent },
	{ path: "about", component: AboutComponent },
	{	path: '**',	component: ListComponent	}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
