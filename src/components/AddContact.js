import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const AddContact = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find((contact) => contact.email === email);
    const checkMobile = contacts.find((contact) => contact.mobile === mobile);

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
      id: contacts[contacts.length - 1].id + 1,
      name: name,
      email: email,
      mobile: mobile,
    };
    console.log(data);
    try {
      dispatch({ type: "ADD_CONTACT", payload: data });
      toast.success("Form submitted success");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3 my-5 text-center">Add Contact</h1>
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
                className="btn btn-dark btn-block"
                value="Add Student"
                style={{ width: "100%" }}
              />
              <Link
                to="/"
                className="btn btn-danger mt-2"
                style={{ width: "100%" }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
