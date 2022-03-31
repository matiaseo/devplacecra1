import './Item.css'
const products = []

export const Item = ({ name }) => {
    return (
        <span className='itemBody'>{name * 4}</span>
    )
}