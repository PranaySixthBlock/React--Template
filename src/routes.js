import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
const List = React.lazy(()=>import('./views/List/users'));
const Form = React.lazy(()=>import('./views/List/form'));
const Role = React.lazy(()=>import('./views/List/role'));
const Roles = React.lazy(()=>import('./views/List/createroles'));

// const Addcase = React.lazy(()=>import('./views/Cases/Addcase.js'));
const routes = [
        { path: '/', name: 'Home', component: DefaultLayout  , exact: true },
        { path: '/users', name: 'List', component: List  , exact: true },
        {path: '/role', name:'Roles/Permissions', component: Role  , exact: true},
        { path: '/form/:id', name: 'Form', component: Form  , exact: true },
        { path: '/createroles/:id', name: 'createRoles', component: Roles  , exact: true },        
];      

export default routes;
