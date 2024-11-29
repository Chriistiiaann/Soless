import PropTypes from 'prop-types'

function Button(props) {
    return (
        <button className={`button ${props.className}`} onClick={props.onClick}>
            {props.text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default Button