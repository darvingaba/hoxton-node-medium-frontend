import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

type Post = {
  id: number;
  content: string;
  title: string;
  like: number;
  comments: Comment[];
};

type Comment = {
  id: number;
  userImage: string;
  userName: string;
  commentText: string;
  postId: number;
};

export function OnePost() {
  let [post, setPost] = useState({} as Post);
  // let [comments, setComments] = useState<Comment[]>([]);
  // let [likes,setLikes]= useState(0)

  let params = useParams();
  let idNr = Number(params);
  console.log(params);

  useEffect(() => {
    fetch(`http://localhost:3345/posts/${params.id}`)
      .then((res) => res.json())
      .then((res) => setPost(res));
  }, []);
  // useEffect(() => {
  //   fetch(`http://localhost:3345/comments/${params.id}`)
  //     .then((res) => res.json())
  //     .then((res) => setComments(res));
  // }, []);
  console.log(post);

  const incrementCount = () => {
    let newPost = structuredClone(post)
      newPost.like += 1;

      fetch(`http://localhost:3345/posts/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        like: newPost.like
      }),
    })
     setPost(newPost)
  };

  return (
    <ul className="singlePost">
      <li key={post.id}>
        <h1>{post.title}</h1>
        <h2 className="postContent">{post.content}</h2>
        <ul>
          <div className="likes">
            <AiFillLike onClick={incrementCount}/>
            {post.like}
          </div>
          <p className="commentsTag">Comments</p>
          <div className="addComment">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetch(`http://localhost:3345/comments`, {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    commentText: e.target.commentText.value,
                    userName: e.target.userName.value,
                    postId: post.id,
                  }),
                })
                  .then((resp) => resp.json())
                  .then(() => {
                    fetch(`http://localhost:3345/posts/${params.id}`)
                      .then((resp) => resp.json())
                      .then((resp) => setPost(resp));
                  });
              }}
            >
              <input
                placeholder="Comment"
                type="text"
                name="commentText"
                required
              />
              <input
                placeholder="UserName"
                type="text"
                name="userName"
                required
              />
              <button>Comment</button>
            </form>
          </div>
          {post.comments?.map((comment) => (
            <li key={comment.id}>
              <div className="commentPost">
                <p>{comment.userName}</p>
                <p>{comment.commentText}</p>
              </div>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
