import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

  /*
    username: root2
    password: test
  */

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()

    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleBlogPost = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(
        `Blog Post '${blogObject.title}' was added successfully`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    .catch(error => {
      setErrorMessage(
        `Blog Post '${blogObject.title}' could not be added.`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  })
  }



  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>

        <Togglable buttonLabel='new note'>
          <BlogForm 
              handleBlogPost = {handleBlogPost}
              title = {title}
              author = {author}
              url = {url}
              setTitle = {setTitle}
              setAuthor = {setAuthor}
              setUrl = {setUrl}
          />
        </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>

      }
    </div>
  )
}

export default App