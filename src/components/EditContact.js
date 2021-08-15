import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();

  const contacts = useSelector((state) => state);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setMobile(currentContact.mobile);
      setEmail(currentContact.email);
    }
  }, [currentContact]);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) => contact.id != id && contact.email === email
    );
    const checkMobile = contacts.find(
      (contact) => contact.id != id && contact.mobile === mobile
    );

    if (!name || !mobile || !email) {
      return toast.warning("Please fill all fields");
    }
    if (checkEmail) {
      return toast.error("Email is already present");
    }
    if (checkMobile) {
      return toast.error("Mobile is already present");
    }

    const data = {
      id: parseInt(id),
      name: name,
      email: email,
      mobile: mobile,
    };
    console.log(data);
    try {
      dispatch({ type: "UPDATE_CONTACT", payload: data });
      toast.success("Form UPDATED success");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {currentContact ? (
          <>
            <h1 className="display-3 my-5 text-center">
              Edit Contact - {currentContact.name}
            </h1>
            <div className="col-md-6 mx-auto shadow p-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group pb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-dark"
                    value="Update Student"
                  />
                  <Link to="/" className="btn btn-danger ms-3">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </>
        ) : (
          <h1 className="display-3 my-5 text-center">No student found</h1>
        )}
      </div>
    </div>
  );
};

export default EditContact;
