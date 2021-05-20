
import PropTypes from 'prop-types'
import Button from './Button'

// to make the Add button disappear when go to About page
import {useLocation} from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {
   const location = useLocation()


    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && 
                <Button color ={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Add'} 
                    onClick = {onAdd}/>
            }
        </header>
    )
}


Header.defaultProps = {
    title: 'Tracking app'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


// // <h1 style={headingStyle}>{title}</h1>, could be used instead of dynamic styling
// const headingStyle = {
//     color: 'white', 
//     backgroundColor: 'black'
// }

export default Header
