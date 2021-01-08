const dummy = (blogs) => {
  // ...
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((accum, current) => accum + current.likes, 0);
}



module.exports = {
  dummy, totalLikes
}


