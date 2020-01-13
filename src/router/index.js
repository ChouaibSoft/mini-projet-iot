import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'
import i18n from '../i18n'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("@/views/Home"),
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import("@/views/Auth"),
            meta: {
                title: i18n.t('page-title.auth')
            }
        },
        {
            path: "/dashboard",
            name:"dashboard",
            component: () => import("@/views/Dashboard"),
            meta: {
                breadcrumb: 'Home Page',
                protected: true,
                title: i18n.t('page-title.dashboard')
            },
            children: [
                {
                    path: "fields/new",
                    name: "new-channel",
                    meta: {
                        breadcrumb: 'Items',
                        protected: true,
                        title: i18n.t('page-title.new-channel'),},
                    component: () => import("@/views/AddChannel")
                },
                {
                    path: "fields",
                    name: "my-channels",
                    component: () => import("@/views/MyChannels"),
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.my-channels'),
                        breadcrumb: 'Home Page'
                    }
                },
                {
                    path: "fields/:id",
                    name: "detail-channels",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.detail-channel')
                    },
                    component: () => import("@/views/DetailChannel"),
                    children: [
                        {
                            path: "view",
                            name: "view",
                            meta: {
                                protected: true,
                                title: i18n.t('page-title.view')
                            },
                            component: () => import("@/components/Visualisation")
                        }
                    ]
                },
                {
                    path: "actions/new",
                    name: "new-trigger",
                    meta: {
                        protected: true,
                        title: i18n.t('page-title.new-trigger'),
                        breadcrumb: 'Home Page'
                    },
                    component: () => import("@/views/AddTrigger")
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (!to.meta.protected) { //route is public, don't check for authentication
        if(store.state.token!= null && to.path === '/auth'){
            router.push('/dashboard');
        }else{
            next()
        }
    } else {  //route is protected, if authenticated, proceed. Else, login
        if(store.getters.getToken!= null){
            next()
        }else{
            router.push('/auth');
        }
    }
});

router.afterEach((to) => {
    Vue.nextTick( () => {
        document.title = to.meta.title ? to.meta.title : 'Iot Agriculture';
    });
});
export default router;
