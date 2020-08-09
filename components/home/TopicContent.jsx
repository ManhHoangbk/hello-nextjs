import { Grid, Collapse, Button } from "@material-ui/core"
import Slider from "react-slick";
import ReactHtmlParser from 'react-html-parser';
import { useState, useEffect } from "react";
import { FixedContainer, LoadingWidget } from "../widgets";
import Rating from '@material-ui/lab/Rating';
import Image from "../Image";
import { connect } from "react-redux";
import { getUserRate } from "../../redux/actions/UserRateAction";
import { formatDate } from "../../utils";

const TopicContent = ({appInfo}) =>{
    let content = appInfo.content ? appInfo.content : '';
    const [openCollapse, setOpenCollapse] = useState(false);
    let showButtonShowMore = content.length > 500;
    return (
        <FixedContainer>
        <div className="space-height"></div>
        <Grid className="user-info-panel"
        container
        direction="row"
        justify='space-between'
        spacing={3}
        >
            <Grid item xs={12} sm={12} md={8} className="user-info-content-panel">
                <h1>{appInfo.title}</h1>
                <Collapse style={{color: '#555'}} in={openCollapse || !showButtonShowMore} collapsedHeight="300px">
                    <div>{ReactHtmlParser(content.replace(/<o:p>/g, '').replace(/<\/o:p>/, ''))}</div>
                </Collapse>
                {showButtonShowMore ? 
                    <Button 
                        style={{float: 'right', margin: '10px 0'}} 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => setOpenCollapse(!openCollapse)}>
                        {openCollapse ? "Show less" : "Show more"}
                    </Button> : ''}
            </Grid>
            <Grid item xs={12} sm={12} md={4} className="user-avatar-content-panel" style={{overflow: 'hidden'}}>
                <div className="parent-app-info-name">
                    <div className="app-info-name">
                        <Image src={appInfo.avatar} alt={appInfo.appName} width="100px" height="100px" />
                        <div className="app-child-name">
                            <h2>{appInfo.appName}</h2>
                            <Rating name="read-only" value={5} readOnly size="small" style={{marginTop: '10px'}} />
                        </div>
                    </div>
                    <div className="link-app-store">
                        <a href={appInfo.urlAndroid} target="_blank" rel="noopener noreferrer">
                            <Image alt="Link google app" src='images/app-store-icon.png' />
                        </a>
                        <div style={{width: '20px'}}></div>
                        <a href={appInfo.urlIos} target="_blank" rel="noopener noreferrer">
                            <Image alt="Link app store" src='images/google-play-icon.png' />
                        </a>
                    </div>
                </div>
                <UserRateAppSlider appId={appInfo.id} />
            </Grid>
        </Grid>
    </FixedContainer>
    )
}

const UserRateAppSliderUI = ({
    userRateState,
    getUserRate,
    appId
    }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        className: "review-app-slider",
    };
    useEffect(() => {
        getUserRate(appId);
    }, []);
    let userRates = userRateState?.data[appId];
    return (
        userRateState.loading == true || !userRateState.data || !userRates ? <LoadingWidget /> :
        <Slider {...settings}>
            {
                userRates.map((userRate) => {
                    return <ReviewAppItem 
                        key={"ReviewAppItem-" + userRate.id}
                        value={5}
                        content={userRate.content}
                        name={userRate.userName}
                        createTime={userRate.createDate}
                    />
                })
            }
        </Slider>
    );
}

const mapStateToPropsUserRate = (state, ownProps) => ({
    userRateState: state.userRateReducer,
    ...ownProps
});
const mapDispatchToPropsUserRate = (dispatch) => ({
    getUserRate: (appId) => getUserRate(appId, dispatch),
});
const UserRateAppSlider = connect(mapStateToPropsUserRate, mapDispatchToPropsUserRate)(UserRateAppSliderUI);


const ReviewAppItem = ({
    content,
    name,
    createTime,
    value
    }) => {
    return (
        <div className="review-app-item">
            <div>
                <p className="dot-3">{content}</p>
                <Grid container alignItems="center" className="info" justify="space-between">
                    <div>
                        <strong>{name}</strong>
                        <div className="time">{formatDate(createTime)}</div>
                    </div>
                    <Rating size="small" value={value} readOnly />
                </Grid>
            </div>
        </div>
    );
}

export default TopicContent