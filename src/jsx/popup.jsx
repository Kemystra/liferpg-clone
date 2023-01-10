const Popup = props => {
    return <div id="bg-cover" onClick={props.onCanceled}>
        <div id="main-popup">
            {props.content}
        </div>
    </div>
}

module.exports = { Popup }