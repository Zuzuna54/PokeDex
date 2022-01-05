import Grid from "../assets/grid.png"
import List from "../assets/list.png"
import toGridView from "../cssFunc/grid"
import toListView from "../cssFunc/list"

const FilterBar = () => {

    return(
        <div className="grid-list"> 
            <div >
                <img onClick={toListView} className="list-icon" src={List} alt="" />
            </div>
            <div >   
                <img onClick={toGridView} className="grid-icon" src={Grid} alt="" />
            </div>
        </div>
    )
}

export default FilterBar