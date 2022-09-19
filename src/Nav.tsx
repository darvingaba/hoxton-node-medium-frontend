import { AiFillHome } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import { BiBookmarks } from "react-icons/bi";
import { MdAutoStories } from "react-icons/md";
import { Link } from "react-router-dom";

export function Nav(){
    return (
      <div className="nav">
        <AiFillHome />
        <AiFillBell />
        <BiBookmarks />
        <MdAutoStories />
      </div>
    );
}