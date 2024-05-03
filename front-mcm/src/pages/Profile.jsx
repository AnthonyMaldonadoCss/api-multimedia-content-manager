import { useAuth } from "../context/AuthContext"
function Profile() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile