const  ImageRow = ({url, selectImage}) => {
    return <div className="img-row">
        <div className="mr-1">
            <input type="checkbox" className="cursor-pointer" onChange={() => {selectImage(url)}} />
        </div>
        <img className="img-item" src={url} alt=""/>
        <div className="img-link">
            <a href={url} target="_blank">{url}</a>
        </div>
        <a href={url} download className="d-btn">Download</a>
    </div>
}

export default ImageRow