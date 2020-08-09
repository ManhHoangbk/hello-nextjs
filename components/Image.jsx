const Image= () => ({ 
    src, 
    alt='',
    width='',
    height='',
    onClick = () => {},
    onLoaded = () => {},
    onError = () => {},
    className
}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
    }, [src])
    const [url, setUrl] = useState(src);
    return (
        <span className={'my-image' + (className ? ' '+className : '')}>
            {loading ? <LoadingWidget /> : ''}
            <img style={loading ? {display: 'none'} : {}} src={url} alt={alt} width={width} height={height} 
            onLoad={() => {
                onLoaded();
                setLoading(false);
            }} onError={() => {
                onError();
                setLoading(false);
                setUrl(ImageError);
            }} onClick={onClick} />
        </span>
    );
}

export default Image;