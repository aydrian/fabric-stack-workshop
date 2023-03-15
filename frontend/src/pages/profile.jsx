import React from "react";

const fakeUser = {
  id: "b3a23e83-dd46-47ce-aefc-695bf8f347c3",
  username: "craig",
  full_name: "Craig Cockroach",
  is_admin: true,
  created_at: new Date(),
  updated_at: new Date()
};

export default function ProfilePage() {
  const [user, setUser] = React.useState(fakeUser);
  return (
    <>
      <h2>Profile</h2>
      <img src="https://picsum.photos/200" />
      <h3>{user.username}</h3>
      <h4>{user.full_name}</h4>
    </>
  );
}
