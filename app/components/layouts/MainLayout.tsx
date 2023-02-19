import Header from "../header/Header";

interface Props {
  children: JSX.Element;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
