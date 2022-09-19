import { Link } from "react-router-dom";


export function Right(){
    return (
      <div>
        <Link to={"/posts"}>
          <h1>Go to all posts</h1>
        </Link>
      </div>
    );
}