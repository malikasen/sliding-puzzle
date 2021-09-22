import * as React from "react";

import * as apiClient from "./apiClient";

const Users = () => {
  const [users, setUsers] = React.useState([]);

  const loadUsers = async () => setUsers(await apiClient.getUsers());
  const addUser = async (user) => {
    await apiClient.addUser(user);
    loadUsers();
  };

  React.useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section>
      <UserList {...{ users }} />
      <AddUser {...{ addUser }} />
    </section>
  );
};

const UserList = ({ users }) => (
  <ul>
    {users.map(({ id, name, email }) => (
      <li key={id}>
        {name} ({email})
      </li>
    ))}
  </ul>
);

const AddUser = ({ addUser }) => {
  const onSubmit = (e) => {
    const form = e.currentTarget;
    const {
      name: { value: name },
      email: { value: email },
    } = form.elements;

    e.preventDefault();
    addUser({ name, email });
    form.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name: <input name="name" required />
      </label>
      <label>
        Email: <input name="email" type="email" required />
      </label>
      <button>Add user</button>
    </form>
  );
};

export default Users;
