import Link from "next/link";
import Arrow from "app/svg/nav-arrow-right.svg";

interface Props {
  page: string;
}

export default function GoTo({ page }: Props) {
  return (
    <Link href={page}>
      <Arrow className="outlineIcon primary" width={28} height={28} />
    </Link>
  );
}
