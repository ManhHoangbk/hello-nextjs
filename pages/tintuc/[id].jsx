import { useRouter } from 'next/router'
import Header from '../../components/header'
import { wrapper } from '../../redux/store'
import fs from 'fs'
import { loadedAppInfoAction } from '../../redux/actions/topicAction'

const Comment = () => {
  const router = useRouter()
  const slug = router.query
    console.log('slug xxx', slug)
  return (
    <>
      <h1>Slug</h1>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getStaticProps')
    let {appname} = context.params
    let allAppInfos =  JSON.parse(fs.readFileSync('datas/appInfo.json', 'utf8'))
    let appInfo = allAppInfos.filter( appInfo => appInfo.appNameId == appname);
    appInfo = appInfo.length > 0 ? appInfo[0] : null
    // console.log('appInfo query ', appInfo)
    context.store.dispatch(loadedAppInfoAction(appInfo))
})

export default Comment