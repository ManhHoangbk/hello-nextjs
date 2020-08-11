import Meta from "../header";

const Layout = (props) => (
    <div>
      <Meta {...props}/>
      {props.children}

    </div>
)

export default Layout