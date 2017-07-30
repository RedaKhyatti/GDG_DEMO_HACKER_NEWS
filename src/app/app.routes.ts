import { Routes } from '@angular/router';

export const ROUTES:Routes =[
    {
        path: '', loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'posts', loadChildren: './post/post.module#PostModule'
    }
];
