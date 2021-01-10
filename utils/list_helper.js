const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accum, current) => accum + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max.apply(Math, blogs.map((element) => {
    return element.likes
  }))

  const favoriteBlog = blogs.filter(blog => blog.likes === maxLikes)

  if (favoriteBlog.length > 0) {
    return {
      author: favoriteBlog[0].author,
      title: favoriteBlog[0].title,
      likes: favoriteBlog[0].likes
    }
  } else {
    return {}
  }
}

const mostLikes = (blogs) => {
  const map = new Map()
  let maxLikeCount = 0
  let maxBlogsAuthor
  blogs.forEach((element) => {
    const key = element.author
    // element by key from newly created map

    const mapEntry = map.get(key)

    const blogCount = mapEntry ? mapEntry.blogCount + 1 : 1
    const likeCount = mapEntry ? mapEntry.likes + element.likes : element.likes

    map.set(key, { blogCount: blogCount, likes: likeCount })

    if (likeCount > maxLikeCount) {
      maxLikeCount = likeCount
      maxBlogsAuthor = key
    }
  })

  if (maxLikeCount > 0) {
    return {
      author: maxBlogsAuthor,
      likes: maxLikeCount
    }
  } else {
    return {}
  }
}

const mostBlogs = (blogs) => {
  const map = new Map()
  let maxBlogsCount = 0
  let maxBlogsAuthor
  blogs.forEach((element) => {
    const key = element.author
    // element by key from newly created map

    const mapEntry = map.get(key)

    const blogCount = mapEntry ? mapEntry.blogCount + 1 : 1
    const likeCount = mapEntry ? mapEntry.likes + element.likes : element.likes

    map.set(key, { blogCount: blogCount, likes: likeCount })

    if (blogCount > maxBlogsCount) {
      maxBlogsCount = blogCount
      maxBlogsAuthor = key
    }
  })

  if (maxBlogsCount > 0) {
    return {
      author: maxBlogsAuthor,
      blogs: maxBlogsCount
    }
  } else {
    return {}
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
