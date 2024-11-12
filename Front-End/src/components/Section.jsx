import PropTypes from 'prop-types';
import Card from './Card';
import './styles/Module.Section.css'

function Section({ title, children, offer }) {

    return (
        <div className={title == "Ofertas" ? "sectionOfertas" : "section"}>
            <div className="title">
                <h2>{title}</h2>
            </div>
            <hr />
            <div className="cards">
                {children.map((child, index) => (
                    <Card key={index} {...child} offer={offer}/> 
                ))}
            </div>
        </div>
    )
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    offer: PropTypes.bool
};

export default Section