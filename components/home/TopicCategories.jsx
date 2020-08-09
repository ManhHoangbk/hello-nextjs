import { getTopicsByParentId } from "../../redux/actions/topicAction";
import { connect } from "react-redux";
import { useEffect } from "react";
import { LoadingWidget, FixedContainer, LineProgress } from "../widgets";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { stringReplaceUrl, stringToHtml} from '../../utils/index'


const TopicCategories = ({
        parentId,
        appInfo,
        appNameId,
        topicState,
        getTopicsByParentId,
        hasState,
        onChangeState,
        isLoadingTopic
        }) => {
        // console.log("HomeContentUI parentId", parentId);
        useEffect(() => {
            getTopicsByParentId(parentId);
        }, [parentId]);
        // console.log("topicState", topicState);
        if(!topicState || topicState.isLoadingTopic === true || !topicState.topics){
            return <LoadingWidget color={null} />;
        }
        let topics  = topicState.topics;
        return (
            <div style={{'backgroundColor': 'var(--main-background-color)'}} className="content-home-page">
                <FixedContainer>
                    <h3 className="main-title">
                        <span>All categories { appInfo ? "of " + appInfo.appName : ""}</span>
                        {hasState ? <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => {
                                onChangeState();
                            }}>Change State</Button> : ''}
                    </h3>
                    <hr />
                    <div>
                        <Grid 
                            className="content-panel" 
                            container
                            direction="row"
                            >
                            {
                                topics.map((topic) => {
                                    return <TopicItem topic={topic} appNameId={appNameId} key={'home-topic-item-' + topic.id} />;
                                })
                            }
                        </Grid>
                    </div>
                </FixedContainer>
            </div>
        );
    }

const TopicItem = ({topic, appNameId}) => {
    const history = useRouter();
    // console.log("TopicItem topic", topic);
    if(!topic){
        return null;
    }
    let description = topic.description;
    let progress = topic?.progress?.progress;
    if(!progress || isNaN(progress) || progress < 0){
        progress = 0;
    }
    let link = '/' + appNameId + '/' + stringReplaceUrl(topic.name) + '-' + topic.id;
    return (
        <Grid item className="topic-item-panel" onClick={() => history.push(link)}>
            <a href={link} onClick={(event) => event.preventDefault()}>
                <label>{topic.name}</label>
                <div>{stringToHtml(description)}</div>
                <LineProgress percent={progress} size={'15px'} />
            </a>
        </Grid>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        topicState: state.appInfoReducer,
        ...ownProps
    }
};

const mapDispatchToProps= (dispatch) => ({
    getTopicsByParentId: (parentId) => getTopicsByParentId(parentId, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicCategories);