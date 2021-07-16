import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
const List = React.lazy(()=>import('./views/List/users'));
const Form = React.lazy(()=>import('./views/List/form'));
const Role = React.lazy(()=>import('./views/List/role'));
const Roles = React.lazy(()=>import('./views/List/createroles'));
const Country = React.lazy(()=>import('./views/List/Country'));
const createCountry = React.lazy(()=>import('./views/List/CreateCountry'));
const State = React.lazy(()=>import('./views/List/State'));
const createState = React.lazy(()=>import('./views/List/CreateState'));
const City = React.lazy(()=>import('./views/List/City'));
const createCity = React.lazy(()=>import('./views/List/CreateCity'));
const TenderCategory = React.lazy(()=>import('./views/List/TenderCategory'));
const createTender = React.lazy(()=>import('./views/List/CreateTender'));
const Department = React.lazy(()=>import('./views/List/Department'));
const createDepartment = React.lazy(()=>import('./views/List/CreateDepartment'));

// const Addcase = React.lazy(()=>import('./views/Cases/Addcase.js'));
const routes = [
        { path: '/', name: 'Home', component: DefaultLayout  , exact: true },
        { path: '/users', name: 'List', component: List  , exact: true },
        { path: '/role', name:'Roles/Permissions', component: Role  , exact: true},
        { path: '/form/:id', name: 'Form', component: Form  , exact: true },
        { path: '/createroles/:id', name: 'createRoles', component: Roles  , exact: true },   
        { path: '/country', name: 'Country', component: Country  , exact: true } ,   
        { path: '/createCountry/:id/:type', name: 'createCountry', component: createCountry  , exact: true } ,
        { path: '/state', name: 'State', component: State  , exact: true } ,   
        { path: '/createState/:id', name: 'createState', component: createState  , exact: true }   , 
        { path: '/city', name: 'City', component: City  , exact: true } ,   
        { path: '/createCity/:id', name: 'createCity', component: createCity  , exact: true }  ,  
        { path: '/tender', name: 'TenderCategory', component: TenderCategory  , exact: true } ,   
        // { path: '/createTender/:id?/:type?', name: 'createTender', component: createTender  , exact: true } ,   
        { path: '/department', name: 'Department', component: Department  , exact: true } ,   
        // { path: '/createDepartment/:id', name: 'createDepartment', component: createDepartment  , exact: true }    
];      

export default routes;
