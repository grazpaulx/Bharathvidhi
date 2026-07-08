// const express = require("express");
// const bcrypt = require("bcrypt");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = 4000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL Database connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "GP@godsgrace333", // Replace with your MySQL password
//   database: "bharat_vidhi", // Replace with your database name
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to MySQL database.");
// });

// // Signup route - POST
// app.post("/signup", async (req, res) => {
//   const { username, email, password, phone_number } = req.body;

//   if (!username || !email || !password || !phone_number) {
//     return res.status(400).json({ message: "Please fill in all fields." });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const query = "INSERT INTO signup (username, email, password, phone_number) VALUES (?, ?, ?, ?)";
//     db.query(query, [username, email, hashedPassword, phone_number], (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Database error." });
//       }
//       res.status(201).json({ message: "Signup successful!" });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error." });
//   }
// });

// // Login route - POST
// // app.post("/login", (req, res) => {
// //   const { username, password } = req.body;

// //   if (!username || !password) {
// //     return res.status(400).json({ message: "Please fill in all fields." });
// //   }

// //   const query = "SELECT * FROM signup WHERE username = ?";
// //   db.query(query, [username], async (err, results) => {
// //     if (err) {
// //       console.error(err);
// //       return res.status(500).json({ message: "Database error." });
// //     }

// //     if (results.length === 0) {
// //       return res.status(401).json({ message: "Invalid username or password." });
// //     }

// //     const user = results[0];
// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (isMatch) {
// //       res.status(200).json({ message: "Login successful!" });
// //     } else {
// //       res.status(401).json({ message: "Invalid username or password." });
// //     }
// //   });
// // });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const query = "SELECT name FROM users WHERE username = ? AND password = ?";
//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (results.length > 0) {
//       // Send the user's full name back to the client
//       return res.status(200).json({ name: results[0].name });
//     } else {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//   });
// });

// // Get all users - GET
// app.get("/users", (req, res) => {
//   const query = "SELECT id, username, email, phone_number, created_at FROM signup";
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Database error." });
//     }
//     res.status(200).json(results);
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GP@godsgrace333", // Replace with your MySQL password
  database: "bharat_vidhi", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Route to fetch all tables from the database
app.get("/", (req, res) => {
  const query = "SHOW TABLES";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching tables:", err);
      return res.status(500).json({ message: "Error fetching tables." });
    }

    // Dynamically format the results to show table names
    const tables = results.map((row) => Object.values(row)[0]);
    res.status(200).json({ tables });
  });
});

// Signup route - POST
app.post("/signup", async (req, res) => {
  const { username, email, password, phone_number } = req.body;

  if (!username || !email || !password || !phone_number) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO signup (username, email, password, phone_number) VALUES (?, ?, ?, ?)";
    db.query(query, [username, email, hashedPassword, phone_number], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error." });
      }
      res.status(201).json({ message: "Signup successful!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// Login route - POST
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT username FROM signup WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      // Validate password using bcrypt
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.status(200).json({ message: "Login successful!", username: user.username });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials." });
    }
  });
});

// Get all users - GET
app.get("/users", (req, res) => {
  const query = "SELECT id, username, email, phone_number, created_at FROM signup";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error." });
    }
    res.status(200).json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





// app.get("/tutorials", (req, res) => {
//   const query = "SELECT * FROM Tutorials"; // Replace 'Tutorials' with your table name
//   db.query(query, (err, results) => {
//       if (err) {
//           return res.status(500).json({ message: "Database error." });
//       }
//       res.status(200).json(results); // Sends all tutorial data
//   });
// });
// Route to fetch tutorials
// app.get("/tutorials", (req, res) => {
//   const query = "SELECT * FROM Tutorials"; // Replace 'Tutorials' with your table name
//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error." });
//     }
//     res.status(200).json(results);
//   });
// });
