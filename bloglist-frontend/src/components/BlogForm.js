const BlogForm = ({
  handleBlogPost,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl
}) => {
  return (
    <div>
      <form onSubmit={handleBlogPost}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)} 
          />
          
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)} 
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)} 
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
