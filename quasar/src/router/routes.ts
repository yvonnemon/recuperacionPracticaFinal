import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'posts', component: () => import('pages/Indice.vue') },
      { path: 'form', component: () => import('pages/PostForm.vue') },
      { path: 'calc', component: () => import('pages/Calculadora.vue') }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
