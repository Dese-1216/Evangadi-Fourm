import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosbase from "../../axiosConfig";

const Register = () => {
  const navigate = useNavigate();
  const userName = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("Form submitted"); // Debug log

    const usernameValue = userName.current.value;
    const firstValue = firstName.current.value;
    const lastValue = lastName.current.value;
    const emailValue = email.current.value;
    const passValue = password.current.value;

    console.log("Form values:", {
      // Debug log
      usernameValue,
      firstValue,
      lastValue,
      emailValue,
      passValue,
    });

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all values");
      return;
    }

    try {
      console.log("Sending request to /user/register"); // Debug log

      const response = await axiosbase.post("/user/register", {
        userName: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });

      console.log("Registration response:", response); // Debug log
      alert("Registration is successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error); // Better error logging
      console.error("Error response:", error.response); // Log the response
      console.error("Error message:", error.message); // Log the message

      if (error.response) {
        alert(
          `Registration failed: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        alert(
          "No response from server. Please check if the backend is running."
        );
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username:</span>
          <input type="text" placeholder="username" ref={userName} />
        </div>
        <br />
        <div>
          <span>First name:</span>
          <input type="text" placeholder="first name" ref={firstName} />
        </div>
        <br />
        <div>
          <span>Last name:</span>
          <input type="text" placeholder="last name" ref={lastName} />
        </div>
        <br />
        <div>
          <span>Email:</span>
          <input type="email" placeholder="type your email" ref={email} />
        </div>
        <br />
        <div>
          <span>Password:</span>
          <input
            type="password"
            placeholder="type your password"
            ref={password}
          />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
