import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {wrapper} from '../redux/store'
import { GET_USER_FROM_TOKEN } from './api/apiConfig';
import { authorizationAction, authorizationActionFalure, logoutAction } from '../redux/actions/authActions';
import { TOKEN, getCookie } from '../utils/cookie';
import { bindActionCreators } from 'redux';
import UserInfoView from '../components/UserInfoView';
import Layout from '../components/layout';
import fs from 'fs'
import { loadedAppInfoAction } from '../redux/actions/topicAction';
import { getDataSEOTopic } from '../components/header/seoUtils';
import TopicContent from '../components/home/TopicContent';
import { MainWidget, LoadingWidget } from '../components/widgets';
import TopicCategories from '../components/home/TopicCategories';
import { useRouter } from 'next/router';


const Index = ({appInfo}) => {
    // console.log('appInfo ', appInfo)
    if(appInfo){
        const {query } = useRouter()
        let appNameId = query.appname
        let parentId = appInfo.id;
        if(appInfo && appInfo.hasState && stateInfoState.mapCurrentStateInfo[appInfo.id]){
            parentId = stateInfoState.mapCurrentStateInfo[appInfo.id].id;
        }
        return (
            <Layout seo={getDataSEOTopic(appInfo)}>
                 <MainWidget>
                    <TopicContent appInfo={appInfo}/>
                    <TopicCategories 
                        parentId={parentId} appNameId={appNameId} 
                        hasState={appInfo && appInfo.hasState}
                        onChangeState={() => {
                            setOpenPopupChangeState(true);
                        }}
                    />
                 </MainWidget>
            </Layout>
        )
    } else{
        return <p>Not found</p>
    }
}

export async function getStaticPaths() {
    var allAppInfos =  JSON.parse(fs.readFileSync('datas/appInfo.json', 'utf8'))
    const paths = allAppInfos.map(appInfo => {
        return {
          params: {
            appname: appInfo.appNameId
          }
        }
      })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = wrapper.getStaticProps(async (context) => {
    let {appname} = context.params
    let allAppInfos =  JSON.parse(fs.readFileSync('datas/appInfo.json', 'utf8'))
    let appInfo = allAppInfos.filter( appInfo => appInfo.appNameId == appname);
    appInfo = appInfo.length > 0 ? appInfo[0] : null
    // console.log('appInfo query ', appInfo)
    context.store.dispatch(loadedAppInfoAction(appInfo))
})

const mapStateToProps = state => ({
    appInfo : state.appInfoReducer.topic
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
