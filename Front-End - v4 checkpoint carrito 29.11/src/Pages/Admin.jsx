
import AdminUsersList from '../components/AdminUsersList';
import './styles/Module.Admin.css';

function Admin() {

    return (
        <div className="admin-container">
            <h1>Admin Dashboard 👷‍♂️</h1>
            <div className="users-container">
                <AdminUsersList />
            </div>
        </div>
    );
}

export default Admin;

