import { useState } from "react"

const Blog = ({blog, updateBlog, deleteBlog}) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const textStyle = {
    margin: 0,
    padding: 0
  }

  const addLike = (blog) => {
    let updatedBlog = {...blog, likes: blog.likes + 1} 
    updateBlog(blog.id, updatedBlog)
  }
  
  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
          {blog.title}
          <button onClick={() => {setBlogVisible(true)}}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p style={textStyle}>
          {blog.title}
          <button onClick={() => setBlogVisible(false)}>hide</button>
        </p>
        <p style={textStyle}>{blog.author}</p>
        <p style={textStyle}>
          likes {blog.likes}
          <button onClick={() => addLike(blog)}>like</button>
        </p>
        <p style={textStyle}>{blog.url}</p>
        <p style={textStyle}>{(blog.user) && blog.user.name}</p>
        {(blog.user) && <button onClick={() => removeBlog(blog)}>remove</button>}
        
      </div>      
    </div>  
  )
}

export default Blog