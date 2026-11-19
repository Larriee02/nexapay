import { ResourceState } from '../../components/ui/Feedback';
import PageHeader from '../../components/ui/PageHeader';
import { useResource } from '../../utils/useResource';

export default function Users() {
  const accounts = useResource('/admin/users');
  return (
    <div>
      <PageHeader title="Accounts" subtitle="View registered NexaPay users and their roles." />
      <ResourceState {...accounts}>
        <div className="card overflow-x-auto">
          <table className="data-table">
            <thead><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Role</th><th scope="col">Created</th></tr></thead>
            <tbody>{accounts.data?.map((user) => <tr key={user.id}><td className="font-semibold">{user.name}</td><td>{user.email}</td><td className="capitalize">{user.role}</td><td>{new Date(user.created_at).toLocaleDateString()}</td></tr>)}</tbody>
          </table>
        </div>
      </ResourceState>
    </div>
  );
}
