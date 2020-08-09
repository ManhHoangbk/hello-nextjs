import { Container, Typography, Grid, CircularProgress } from "@material-ui/core";


const FixedContainer = (props) => {
    return (
        <React.Fragment>
            <Container fixed className={'fixed-container' + (props.className ? ' ' + props.className : '')} style={props.style}>
                <Typography component="div" style={{}}>
                    {props.children}
                </Typography>
            </Container>
        </React.Fragment>
    );
}

const MainWidget = (props) => {
    let className = props.className;
    return (
        <div className={'body-panel' + (className ? ' ' + className : '')}>
            {props.children}
        </div>
    );
}

const LoadingWidget = (props) => {
    let { color, width, height, fixed } = props;
    if (!color) {
        color = "var(--main-color)";
    }
    let style = { color: color, textAlign: "center", margin: "15px auto" };
    if(width){
        style.width = width;
    }
    if(height){
        style.height = height;
    }
    if(fixed){
        return (
            <Grid container justify="center" alignItems="center" 
                style={{position: 'fixed', width: '100%', 
                    height: '100%', zIndex: 9999, backgroundColor: 'white'}}>
                <div style={style}><CircularProgress style={{color: 'var(--main-color)'}} /></div>
            </Grid>
        );
    }
    return (
        <Grid container justify="center" alignItems="center" style={style}><CircularProgress color="inherit" /></Grid>
    );
}
const LineProgress = ({ percent, size }) => {
    return (
        <Grid
            className="parent-line-progress-panel"
            container
            direction="row"
            alignItems="center"
        >
            <div className="line-progress-panel" style={{ 'height': size, 'width': 'calc(100% - 40px)' }}>
                <div style={{ 'width': percent + '%' }} className="content-line-progress-panel"></div>
            </div>
            <div style={{ 'width': '40px', 'textAlign': 'right' }}>
                {percent}%
                </div>
        </Grid>
    );
}
export {FixedContainer, MainWidget, LoadingWidget, LineProgress};

