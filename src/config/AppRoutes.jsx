import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import { Home } from '../pages/Home';
import { Cart } from '../pages/Cart';
import { Invoices } from '../pages/Invoices';
import { Accounts } from '../pages/Accounts';
import { ShippingAddress } from '../pages/ShippingAddress';
import { ConfirmOrders } from '../pages/ConfirmOrders';
import { SettingsPage } from '../pages/SettingsPage';

import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { Profile } from '../components/Profile';
import { EditProfile } from '../components/EditProfile';
import { ListOrders } from '../components/ListOrders';
import { AddAddress } from '../components/AddAddress';
import { ListAddress } from '../components/ListAddress';
import { EditAddress } from '../components/EditAddress';
import { ListProducts } from '../components/ListProducts';
import { AddProduct } from '../components/AddProduct';
import { EditProduct } from '../components/EditProduct';
import { ListCategories } from '../components/ListCategories';
import { AddCategory } from '../components/AddCategory';
import { EditCategory } from '../components/EditCategory';
import { ListTags } from '../components/ListTags';
import { AddTag } from '../components/AddTag';
import { EditTag } from '../components/EditTag';
import { ListUsers } from '../components/ListUsers';
import { AddUser } from '../components/AddUser';
import { EditUser } from '../components/EditUser';

import { UnAuthenticated } from '../components/UnAuthenticated';
import { UnAuthorization } from '../components/UnAuthorization';
import { NotFound } from '../components/NotFOund';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/unauthenticated' element={<UnAuthenticated />} />
            <Route path='/unauthorized' element={<UnAuthorization />} />
            <Route path='*' element={<NotFound />} />
            <Route element={<PrivateRoute />}>
                <Route path={'/account'} element={<Accounts />}>
                    <Route index element={<Profile />} />
                    <Route path={'edit/:idProfile'} element={<EditProfile />} />
                    <Route path={'address'} element={<ListAddress />} />
                    <Route path={'add-address'} element={<AddAddress />} />
                    <Route path={'edit-address/:idAddress'} element={<EditAddress />} />
                    <Route path={'orders'} element={<ListOrders />} />
                </Route>
                <Route path={'/cart'} element={<Cart />} />
                <Route path={'/shipping-address'} element={<ShippingAddress />} />
                <Route path={'/confirm-order'} element={<ConfirmOrders />} />
                <Route path={'/invoices/:orderId'} element={<Invoices />} />
            </Route>
            <Route element={<AdminRoute />}>
                <Route path={'/settings'} element={<SettingsPage />}>
                    <Route index element={<ListProducts />} />
                    <Route path={'add-product'} element={<AddProduct />} />
                    <Route path={'edit-product/:idProduct'} element={<EditProduct />} />
                    <Route path={'categories'} element={<ListCategories />} />
                    <Route path={'add-category'} element={<AddCategory />} />
                    <Route path={'edit-category/:idCategory'} element={<EditCategory />} />
                    <Route path={'tags'} element={<ListTags />} />
                    <Route path={'add-tag'} element={<AddTag />} />
                    <Route path={'edit-tag/:idTag'} element={<EditTag />} />
                    <Route path={'users'} element={<ListUsers />} />
                    <Route path={'add-user'} element={<AddUser />} />
                    <Route path={'edit-user/:idUser'} element={<EditUser />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes
