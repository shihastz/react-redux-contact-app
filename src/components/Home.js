import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const contacts = useSelector((state) => state);

  const dispatch = useDispatch();

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    return toast.success("Deleted successfully");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5 text-right">
          <Link
            to="/add"
            className="btn btn-outline-dark"
            style={{ float: "right" }}
          >
            Add contact
          </Link>
        </div>
        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, id) => (
                <tr key={id}>
                  <td className="text-center">{id + 1}</td>
                  <td className="text-center">{contact.name}</td>
                  <td className="text-center">{contact.email}</td>
                  <td className="text-center">{contact.mobile}</td>
                  <td className="text-center">
                    <Link
                      to={`/edit/${contact.id}`}
                      className="btn btn-small btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      typ="button"
                      className="btn btn-small btn-danger ms-2"
                      onClick={() => deleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
