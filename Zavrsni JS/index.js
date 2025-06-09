const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;
const db = new sqlite3.Database('./../Baza podataka/zadatci.db');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  db.all("SELECT * FROM users", (err, rows) => {
  if (err) {
    console.error(err.message);
  }
});
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });
    if (!user) return res.status(401).json({ success: false, message: 'Username or password is incorrect, try again!' });

    res.json({ success: true, message: 'Login successful', user });
  });
})
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  db.run('INSERT into users(username, password) VALUES(?, ?)', [username, password], (err, user) => {
    if (err) return res.status(500).json({success: false, message: "Server error"});
    res.json({ success: true, message: 'User created, try logging in now!'});
  })

})

app.get('/api/getTasks', (req, res) => {
  db.all('SELECT id, title, dueDate, priority, completed from tasks where userID = ?', 
    [req.query.id], (err, tasks) => {
    if(err) return res.status(500).json({success: false, message: "Server error"});
    res.json({success: true, message: 'Succesfully pulled the tasks', tasks: tasks});
  })
})

app.delete('/api/tasks/:id', (req, res) => {
  db.run('DELETE from tasks where id=?', [req.params.id], (err, _) => {
    if (err) return res.status(500).json({success: false, message: "Server error"});
    res.json({ success: true, message: 'Succesful Deletion!'});
  })
})

app.post('/api/tasks', (req, res) => {
  const newTask = req.body.task;
  const userid = req.body.userId;
  db.run('INSERT INTO tasks(title, dueDate, priority, userID) values(?, ?, ?, ?)', 
        [newTask.title, newTask.dueDate, newTask.priority, userid], (err, _) => {
          if(err) return res.status(500).json({success: false, message:"Server error"});
          res.json({success: true, message:'Input succesful'});
        }
  )
})

app.put('/api/tasks/:idToEdit', (req, res) => {
  const updatedTask = req.body.task;
  const taskId = req.params.idToEdit;
  db.run('UPDATE tasks set title=?, dueDate=?, priority=? where id=?',
      [updatedTask.title, updatedTask.dueDate, updatedTask.priority, taskId], (err, _) => {
        if(err) return res.status(500).json({success: false, message: "Server error"});
        res.json({success: true, message:"Update succesful"});
      }
  )
})
app.put('/api/tasks/:id/toggle', (req, res) => {
  db.run('UPDATE tasks set completed = 1 - completed where id=?', [req.params.id], (err, _) => {
    if(err) return res.status(500).json({success: false, message: "Server error"});
    res.json({success: true, message: 'Succesful Update'});
  })
})