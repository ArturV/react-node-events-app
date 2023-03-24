import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Home, SignIn, Events, AddEvent, Users, AddUser } from "../Pages";
import { EventUsers } from "../Pages/Events/EventUsers";
import { Register } from "../Pages/Register/Register";

export const Navigation = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return (
      <BrowserRouter>
        <header className="header-navigation">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/users">Users</Link>
          <Link to="/add-user">Add User</Link>
          <Link to="/add-event">Add Event</Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/event-users/:idevent" element={<EventUsers />} />

          <Route path="*" element={<p>Oops.. Erorr 404: Can't find page</p>} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <header className="header-navigation">
          <Link to="/">Home</Link>
          {/* <Link to="/signin">Signin</Link> */}
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<p>Oops.. Erorr 404: Can't find page</p>} />
        </Routes>
      </BrowserRouter>
    );
  }
};
