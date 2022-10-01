import "./WebTitle.sass"

export default function WebTitle (props) {

    return (
        <div className="webtitle width">
            <span className="title-36 parchm"> sheet sage </span> 
        {props.children}
        </div>
    )
}