import TablaAdmin from '../components/TablaAdmin';
import AdminUsersList from '../components/AdminUsersList';
import './styles/Module.Admin.css';

function Admin() {

    return (
        <div className="admin-container">
            <h1>Admin Dashboard 👷‍♂️</h1>
            <div className="users-products-container">
                <AdminUsersList />
                <TablaAdmin />
            </div>
        </div>
    );
}

export default Admin;

