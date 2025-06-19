import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Admin from '@/views/Admin/Admin.vue'
import Gallery from '@/views/Admin/Gallery.vue'
import AddImage from '@/views/Admin/AddImage.vue'

import PageNotFound from '../views/PageNotFound.vue'

import Category from '@/views/Category/Category.vue'
import AddCategory from '@/views/Category/AddCategory.vue'
import EditCategory from '@/views/Category/EditCategory.vue'
import ListProducts from '@/views/Category/ListProducts.vue'

import SignUp from '@/views/SignUp.vue'
import SIgnIn from '@/views/SIgnIn.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path : '/admin/gallery',
    name : 'Gallery',
    component : Gallery
  },
  {
    path : '/admin/gallery/add',
    name : 'AddImage',
    component : AddImage
  },

  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/admin/category',
    name: 'AdminCategory',
    component: Category
  },
  {
    path: '/admin/category/add',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/admin/category/:id',
    name: 'EditCategory',
    component: EditCategory
  },
  {
    path : '/category/show/:id',
    name : 'ListProducts',
    component: ListProducts
  },

  //Page Not found
  {
    path : '/:catchAll(.*)',
    name : 'PageNotFound',
    component : PageNotFound
  },
  //Signin and Signup
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SIgnIn
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
