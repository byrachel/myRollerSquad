import Star from "../icons/svg/star.svg";

interface Props {
  userFav: boolean;
  favCounter: number;
}

export default function AddEventToFav({ userFav, favCounter }: Props) {

  const onClick = () => {
    console.log("click");
  };

  return (
    <div className="inline">
        <Star className={userFav ? "fullIcon pink" : "outlineIcon pink"} width={24} height={24} onClick={onClick} />
        <p className="meta">{favCounter ? favCounter : "0"} fans</p>
    </div>
  );
}
