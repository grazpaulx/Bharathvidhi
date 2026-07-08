// Toggle between Login and Signup forms
const signupLink = document.getElementById("signup-link");
const loginLink = document.getElementById("login-link");
const signupBox = document.getElementById("signup-box");
const loginBox = document.getElementById("login-box");

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupBox.style.display = "block";
  loginBox.style.display = "none";
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupBox.style.display = "none";
  loginBox.style.display = "block";
});

// Handle Signup Form Submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const phone = document.getElementById("signup-phone").value.trim();

  if (!username || !email || !password || !phone) {
    return alert("Please fill in all fields.");
  }

  try {
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, phone_number: phone }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // Display success message
      document.getElementById("signupForm").reset(); // Clear the form
      signupBox.style.display = "none"; // Switch to login view
      loginBox.style.display = "block";
    } else {
      alert(data.message); // Display error message from server
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Error connecting to the server. Please try again later.");
  }
});

// Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    return alert("Please fill in both fields.");
  }

  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!"); // Display success message
      localStorage.setItem("username", username); // Save username in localStorage
      window.location.href = "indexr.html"; // Redirect to dashboard or main page
    } else {
      alert(data.message); // Display error message from server
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Error connecting to the server. Please try again later.");
  }
});
// Handle Login Form Submission
// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
  
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value;
  
//     if (!username || !password) {
//       return alert("Please fill in both fields.");
//     }
  
//     try {
//       const response = await fetch("http://localhost:4000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert("Login successful!"); // Display success message
//         localStorage.setItem("username", username); // Save username in localStorage
//         window.location.href = "index.html"; // Redirect to profile page
//       } else {
//         alert(data.message); // Display error message from server
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Error connecting to the server. Please try again later.");
//     }
//   });
  
// Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    if (!username || !password) {
      return alert("Please fill in both fields.");
    }
  
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send login credentials
      });
  
      const data = await response.json(); // Parse JSON response
  
      if (response.ok) {
        // Assuming the backend sends the user's full name in 'data.name'
        alert("Login successful!");
  
        // Save the logged-in user's name to localStorage
        localStorage.setItem("username", data.name); // Store the name (e.g., "John Doe")
  
        // Redirect to profile page
        window.location.href = "index.html";
      } else {
        alert(data.message); // Display backend error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error connecting to the server. Please try again later.");
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Validate Signup Form
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        const password = document.getElementById("signupPassword").value;
        const phoneNumber = document.getElementById("signupPhone").value;
  
        // Validate Password
        if (!validatePassword(password)) {
          alert("Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.");
          e.preventDefault();
          return;
        }
  
        // Validate Phone Number
        if (!validatePhoneNumber(phoneNumber)) {
          alert("Phone number must be exactly 10 digits and contain only numbers.");
          e.preventDefault();
          return;
        }
      });
    }
  
    // Validate Login Form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        const password = document.getElementById("loginPassword").value;
  
        // Validate Password
        if (!validatePassword(password)) {
          alert("Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.");
          e.preventDefault();
        }
      });
    }
  });
  
  // Helper function to validate password
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  }
  
  // Helper function to validate phone number
  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }
  