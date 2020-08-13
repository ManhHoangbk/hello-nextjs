import React, { Component } from 'react';
import { connect } from 'react-redux';
import {wrapper} from '../redux/store'
import { GET_USER_FROM_TOKEN } from './api/apiConfig';
import { authorizationAction, authorizationActionFalure, logoutAction } from '../redux/actions/authActions';
import { TOKEN, getCookie } from '../utils/cookie';
import { bindActionCreators } from 'redux';
import UserInfoView from '../components/UserInfoView';
import Layout from '../components/layout';
import { getDataSEOHomePage } from '../components/header/seoUtils';
import '../styles/home.global.scss'
import '../styles/main.global.scss'

const Index = ({user}) => {
    return (
    <Layout seo={getDataSEOHomePage()}>
        <UserInfoView />
    </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps( async (context) => {
    let token = getCookie(TOKEN, context.req);
    let userInfo = null;
    if(token){
        let response = await fetch(process.env.BASE_URL_API +'api/user/authention/' + GET_USER_FROM_TOKEN + '?token='+ token)
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
