export default function HomeLayout({
  children, modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  // console.log('===================================');
  // console.log(modal);
  

  return (
    <>
      {children}
      {modal}
    </>
  );
}
