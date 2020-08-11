import Head from 'next/head'
import { AppBar, Grid, Container, Link, Button } from '@material-ui/core';
import { useRouter } from 'next/router'
import Routes from '../../routes';
const Meta = ({seo}) => {
  return (    
    <>  
    <Head>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta charSet="utf-8" />
        <title>{seo.title}</title>
        <meta name="title" content={seo.appName} />
        <meta name="description" content={seo.desc} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="url" content={`https://hello-nextjs-sigma.vercel.app${seo.url}`} />
        
        <meta name="og:title" property="og:title" content={seo.title} />
        <meta name="og:description" property="og:description" content={seo.desc} />
        <meta name="og:type" content="elearning" />
        <meta name="og:url" content={`https://hello-nextjs-sigma.vercel.app${seo.url}`} />  
        <meta name="og:email" content="abcteam@gmail.com"/>
        { seo.image ? ( <meta property="og:image" content={`${seo.image}`} />   ) : null } 
        <meta name="og:site_name" content="passemall" />

        {/* Apple Meta Tags  */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="yes" name="apple-touch-fullscreen" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no"/>

        {/* <meta name="fb:page_id" content="43929265776" /> */}
        {/* <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.desc} />
        <meta name="twitter:card" content="summary" /> 
        <meta name="twitter:site" content="@propernounco" />
        <meta name="twitter:creator" content="@propernounco" /> */}
        <link rel="canonical" href="https://hello-nextjs-sigma.vercel.app/"></link>
        <link rel="icon" type="image/png" href="images/logo.svg" />
        
    </Head>
    <HeaderPC/>
      </>
  )
}

const HeaderTabPanel = () => {
  const {query } = useRouter()
  let appNameId = query.appname
  let screen 
	console.log("appNameId", appNameId, 'screen', screen);
	screen = screen ?? '';
	let homeScreen = screen.length == 0;
	let studyScreen = !screen.startsWith('test') && !screen.startsWith('review') && !homeScreen;
	const gotoPage = (event, screen) => {
		event.preventDefault();
		// history.push(getLink(screen));
	}
	const getLink = (screen) => {
		return '/' + appNameId + (screen ? '/' + screen : '');
	}
	return (
		<div className="header-tabs-panel">
			{
				studyScreen ?
					<Button 
						className={"header-tab-button" + (studyScreen ? ' active' : '')}>Learn</Button>
					: <Button 
						href={getLink()}
						className={"header-tab-button" + (homeScreen ? ' active' : '')} 
						onClick={(event) => gotoPage(event)}>Home</Button>
			}
			<Button 
				href={getLink(Routes.TEST_SCREEN)}
				className={"header-tab-button" + (screen.startsWith(Routes.TEST_SCREEN) ? ' active' : '')} 
				onClick={(event) => gotoPage(event, Routes.TEST_SCREEN)}>Test</Button>
			<Button 
				href={getLink(Routes.REVIEW_SCREEN)}
				className={"header-tab-button" + (screen.startsWith(Routes.REVIEW_SCREEN) ? ' active' : '')} 
				onClick={(event) => gotoPage(event, Routes.REVIEW_SCREEN)}>Review</Button>
		</div>
	);
}

const HeaderPC = ({ alt }) => {
	return (
    <AppBar color="inherit" position="static" className="main-app-bar">
    <div>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Link href="/" className={'logo-web'} onClick={(event) => {
            event.preventDefault();
            // Router.push('/');
          }}>
            <img alt={alt} src='images/logo.svg' />
          </Link>
          <HeaderTabPanel />
          <div className="temp-panel"></div>
          <div className="temp-panel"></div>
          {/*<LoginPanel />*/}
        </Grid>
      </Container>
    </div>
  </AppBar>
	);
}

export default Meta