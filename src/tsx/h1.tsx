// props is an object that contains name that is of the value string
function Header1(props: { name: string }) {
  return <h1>Hey, {props.name}!</h1>;
}

export default Header1;
