import { connect } from "react-redux";
import { Component } from "react";
import { bindActionCreators } from "redux";
import { logoutAction } from "../redux/actions/authActions";
import SignIn from "./SignIn";
import { removeCookie, TOKEN } from "../utils/cookie";


class UserInfoView extends Component{

    constructor(props) {
        super(props);
    }

    handelLogout(){
        removeCookie(TOKEN);
        this.props.onLogout()
    }

    render() {
        const {user} = this.props
        if(user && user.email){
            return <div>
                    <p>Hello {user.email}</p> 
                    <button onClick={() => this.handelLogout()}> Logout</button>
                </div>
        } else {
            return <SignIn/>
        }
    }
}

const mapStateToProps = (state) => {
    return ({
        user : state.authenticateReducer.user
    })
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        onLogout : bindActionCreators(logoutAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoView);