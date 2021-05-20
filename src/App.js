import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {BrowserRouter as Router, Route} from 'react-router-dom'


const App = () => {

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState(
      [
        // data obj is put to db.json to act as a fake backend data fetch
          // {
          //     id:1,
          //     text: 'Doctors Appointment',
          //     day: 'Feb 5th at 2:30pm',
          //     reminder: true,
          // },
          // {
          //     id:2,
          //     text: 'Meeting at School',
          //     day: 'Feb 6th at 1:30pm',
          //     reminder: true,
          // },
          // {
          //     id:3,
          //     text: 'Food Shopping',
          //     day: 'Feb 5th at 2:30pm',
          //     reminder: false,
          // }
      ]
  );
// only for backend process
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
      

    getTasks()
  }, [])

  // fetch tasks (only for backend process)
  const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      return data
    }

  // fetch tasks (only for backend process)
  const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }

  // Add tasks
  const addTask = async (task) => {
    const res = await fetch ('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])


    // this part is used for without the backend case
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  // delete tasks
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()


    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder:!task.reminder} : task))
  }
 
  return (
    <Router>
  
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)}
              showAdd = {showAddTask}/>
      
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
             {tasks.length > 0 
                ? <Tasks tasks={tasks} 
                        onDelete={deleteTask} 
                        onToggle={toggleReminder}/>
                : 'No Tasks'}
          </>
        )} />
        <Route path='/about' component ={About}/>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
