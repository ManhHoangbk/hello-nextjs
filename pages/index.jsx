// import React from 'react';
// import {connect} from 'react-redux';
// import {decrementCounter, incrementCounter, LOADED_CATEGORY} from '../redux/actions/counterActions';

// function App({ props }){
//     console.log(props)

//     return (
//         <div>
//             {/* <button onClick={this.props.incrementCounter}>Increment</button>
//             <button onClick={this.props.decrementCounter}>Decrement</button> */}
//             <h1>{props.categories.length}</h1>
//         </div>
//     )
// }

// const mapStateToProps = state => ({
//     counter: state.counter.value,
//     categories : state.categories
// });

// const mapDispatchToProps = {
//     incrementCounter: incrementCounter,
//     decrementCounter: decrementCounter,
// };

// export async function getStaticProps({params}) {
//     console.log('getStaticProps ')
//     await fetchCategories();
//     return {
//       props: {
//       }
//     }
//   }

//   App.getInitialProps = async ({ store, isServer, pathname, query }) => {
//     await store.dispatch(fetchCategories());
//     return { custom: 'custom' };
// };

//   export async function fetchCategories () {
//     const response = await fetch( 'https://new-dot-ielts-fighters.appspot.com/api?action=getCategories')
//     let allCategoriesJson = await response.json();
//     let allCategories = allCategoriesJson.data;
//     console.log(allCategories.length > 0 ? "allCategories oki " : "allCategories not okii")
//     return dispatch => dispatch({ type: LOADED_CATEGORY, allCategories });
// }

// export default connect(mapStateToProps)(App);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {decrementCounter, incrementCounter, LOADED_CATEGORY, loadedCategory} from '../redux/actions/counterActions';
import {wrapper} from '../redux/store'
import ListCategory from '../components/ListCategory';
import SignIn from '../components/SignIn';
import { GET_ALL_USERS, GET_USER_FROM_TOKEN } from './api/apiConfig';
import { authorizationAction, authorizationActionFalure, logoutAction } from '../redux/actions/authActions';
import { TOKEN, getCookie } from '../utils/cookie';
import { bindActionCreators } from 'redux';
import UserInfoView from '../components/UserInfoView';

const Index = ({user}) => {
   return <UserInfoView/>
}

export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
    let token = getCookie(TOKEN, context.req);
    let userInfo = null;
    if(token){
        let response = await fetch('http://localhost:3000/api/user/authention/' + GET_USER_FROM_TOKEN + '?token='+ token)
        if( response.status == 200){
            let user = await response.json();
            if(user && user.email){
                userInfo = user
            }
        }
    }
    if(userInfo){
        context.store.dispatch(authorizationAction(userInfo))
    } else{
        context.store.dispatch(authorizationActionFalure())
    }
})
// export const getStaticProps = wrapper.getServerSideProps((context) => {
//     console.log('', context)
//         // const response = await fetch( 'https://new-dot-ielts-fighters.appspot.com/api?action=getCategories')
//         // let allCategoriesJson = await response.json();
//         // let allCategories = allCategoriesJson.data;
//         // console.log(allCategories.length > 0 ? "allCategories oki " : "allCategories not okii")
//         // store.dispatch(loadedCategory(allCategories));
// })

const mapStateToProps = state => ({
    categories : state.counterReducer.categories,
    user : state.authenticateReducer.user
})

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout : bindActionCreators(logoutAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
