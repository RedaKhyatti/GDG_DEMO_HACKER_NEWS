import { Routes } from '@angular/router';

export const ROUTES:Routes =[
    {
        path: '', redirectTo: 'authenticate', pathMatch: 'full'
    }, 
    {
        path: 'authenticate', loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'posts', loadChildren: './post/post.module#PostModule'
    },
];
