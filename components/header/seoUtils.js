export const getDataSEOTopic = (topic) =>{
    var obj = {}
    if(topic){
        obj.title = topic.title
        obj.desc = topic.description
        obj.image = topic.avatar
        obj.url = '/'+topic.appNameId
        obj.keywords = topic.keywords
    }
    return obj;
}