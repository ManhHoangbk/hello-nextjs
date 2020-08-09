export const getDataSEOTopic = (topic) =>{
    var obj = {}
    if(topic){
        obj.title = topic.appName
        obj.desc = topic.description
        obj.image = topic.avatar
        obj.url = '/'+topic.appNameId
        obj.keywords = topic.keywords
    }
    return obj;
}

export const getDataSEOHomePage = () =>{
    var obj = {}
        obj.title = 'ABC Learning'
        obj.desc = 'With thousands of our FREE practice questions, we are here to help you achieve your gate of success with our test prep solutions.'
        obj.image = 'images/logo.svg'
        obj.url = ''
        obj.keywords = 'Abc e-learning, abc elearning, study online, practice test, practice question, exam prepare, asvab, teas exam, cdl test, cdl practice, cissp exam, cissp practice, accuplacer, comptia practice test, comptia A+, compTIA Network, comptia security, dmv, dmv practice test, driving theory, driving theory UK, G1 test, GED, hesi, hesi A2, motorcycle permit, pmp, pmp exam, ptcb, ptce, real estate exam, practice app, practice test onl, free practice test, free practice questions, free practice app'
    return obj;
}