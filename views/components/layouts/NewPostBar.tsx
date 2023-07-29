import Link from "next/link";
import Roller from "views/svg/rollerquad.svg";

export default function NewPostBar() {
  return (
    <div className="newPostBar">
      <Roller className="rollerIcon" width={45} height={45} />
      <Link href="/post/newpost" className="newPostButton">
        <p>Quoi de beau à partager aujourd'hui ?</p>
        <p>+</p>
      </Link>
    </div>
  );
}
