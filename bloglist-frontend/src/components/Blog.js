import { useState } from "react"

const Blog = ({blog}) => {
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
          <button>like</button>
        </p>
        <p style={textStyle}>{blog.url}</p>
        {(blog.user) && blog.user.name}
        
      </div>      
    </div>  
  )
}

export default Blog