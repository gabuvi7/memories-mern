const PostsReducer = (posts = [], action) => {
  switch (action.type) {
    case "CREATE":
      return posts;
    case "UPDATE":
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    case "FETCH_ALL":
      return action.payload;
    default:
      return posts;
  }
};

export default PostsReducer;
