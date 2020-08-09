
export const LOADED_APP_INFO = 'loaded-app-info'
export const LOADING_TOPIC = 'loading-topic'
export const LOAD_TOPIC_SUCCESS = 'load-topic-success'
export const LOAD_TOPIC_FALURE = 'load-topic-failure'


export const loadedAppInfoAction = (topic) => ({
    type : LOADED_APP_INFO,
    topic: topic
})

export const loadingTopicAction = () => ({
    type : LOADING_TOPIC,
})

export const loadTopicSuccess = (topics) => ({
    type : LOAD_TOPIC_SUCCESS,
    topics : topics
})

export const getTopicsByParentId = async (parentId, dispatch) => {
    dispatch(loadingTopicAction())
    let res = await fetch('https://webappapi-dot-micro-enigma-235001.appspot.com/data?type=get_topics_by_parent_id&parentId=' + parentId);
    let data = await res.json();
    dispatch(loadTopicSuccess(data))
}