import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  content: string;
  title: string;
  userName:string,
  userImage:string,
  like: boolean;
  comments: [];
};

type Props = {
  posts: Post[];
};

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3345/posts")
      .then((resp) => resp.json())
      .then((resp) => setPosts(resp));
  }, [posts]);
  return (
    <ul className="postsList">
      <h1>Medium</h1>
      {posts.map((post) => (
        <>
          <li className="posts" key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <img src={post.userImage} alt="" />
              <div className="contentInPost">
                <h1>{post.userName}</h1>
                <h1>{post.title}</h1>
                <p className="postContent">{post.content}</p>
              </div>
            </Link>
              

            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(`http://localhost:3345/posts/${post.id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    content: e.target.update.value,
                  }),
                })
                  .then((resp) => resp.json())
                  .then(() => {
                    fetch("http://localhost:3345/posts")
                      .then((resp) => resp.json())
                      .then((resp) => setPosts(resp));
                  });
              }}
            >
              <input className="editInput" type="text" name="update" />
              <button>Edit</button>
            </form>
          </li>
        </>
      ))}
    </ul>
  );
}
