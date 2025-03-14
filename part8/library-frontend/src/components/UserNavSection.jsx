const UserNavSection = ({ setPage, token, logout }) => {
  if (!token) {
    return <button onClick={() => setPage("login")}>login</button>;
  }
  
  return (
    <>
      <button onClick={() => setPage("add")}>add book</button>
      <button onClick={() => setPage("recommended")}>recommended</button>
      <button onClick={logout}>logout</button>
    </>
  )
}

export default UserNavSection;
