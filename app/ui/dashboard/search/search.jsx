import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'

//this function is for display a searchbar
const Search = ({ placeholder, onChange }) => {
    return(
        <div className={styles.container}>
            <MdSearch/>
            <input type="text" placeholder={placeholder} className={styles.input} onChange={onChange} />
        </div>
    )
}

export default Search