import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [Name, setName ] = useState('');
  const [Email,setEmail] = useState('');
  const [Password,setPassword] = useState('');
  const [editing,setEditing] = useState(false);
  const [currentName,setCurrentName] = useState('');
  useEffect(() => {
    fetchUsers();
  }, []);
  async function fetchUsers(){
   try {
    const res = await fetch('http://localhost:3000/read');
    const data =await res.json();
    setUsers(data);
   } catch (error) {
    console.error(error);
   }  
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name:Name, email:Email, password:Password };
    try {
      if (editing) {
        await fetch(`http://localhost:3000/update/${currentName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        setEditing(false);
        setCurrentName('');
      } else {
       let res =  await fetch('http://localhost:3000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        if (res.ok) {
          const data = await res.json();
          console.log('User created successfully:', data);
        } else {
          console.error('Failed to create user:', res.statusText);
        }
      }
      fetchUsers(); 
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (name) => {
    try {
      await fetch(`http://localhost:3000/delete/${name}`, {
        method: 'Post'
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setEditing(true);
    setCurrentName(user.name);
  };
  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };
  return (
    <>
     <div>
      <h2>User Curd opreation </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={Name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>password:</label>
          <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">{editing ? 'Update' : 'Create'} User</button>
        {editing && <button onClick={clearForm}>Cancel Edit</button>}
      </form>

      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            <strong>{user.name}</strong> (Name: {user.name},Email: {user.email}, password: {user.password})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.name)}>Delete</button>
          </li>
        ))}
      </ul>
     </div>
    </>
  )
}

export default App
