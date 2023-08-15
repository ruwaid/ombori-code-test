export interface UserType {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
};

interface UserListItemProps {
  user: UserType
}

const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <li className="flex justify-between gap-x-6 p-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user.avatar} alt="" />
        <div className="min-w-0 flex-auto">
          <p className="text-md font-semibold leading-6 text-gray-900">
            {user.first_name + " " + user.last_name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {user.email}
          </p>
        </div>
      </div>
    </li>
  );
};

interface UserListProps {
  users: UserType[],
  search: string
}

const UserList = ({ users, search }: UserListProps) => {
  return (
    <ul className="divide-y divide-gray-200 bg-white rounded-md drop-shadow">
      {users.filter((user) => {
        search = search.trim().toLowerCase();
        return search === ''
          ? user
          : (user.first_name + ' ' + user.last_name).toLowerCase().includes(search);
      }).map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

UserList.Item = UserListItem;

export default UserList;
