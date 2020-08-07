import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCategory } from '../redux/actions/counterActions';

 class ListCategory extends Component{

    render() {
        const {categories, addCategory} = this.props
        return(
            <div>
                {categories.map((element) =>  <h2 key={element.id}>{element.name}</h2>  )}
                <button onClick={addCategory}>add category</button>
            </div>
        );
    }
 }

const mapStateToProps = (state) => {
    return ({
        categories: state.counterReducer.categories,
    })
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: bindActionCreators(addCategory, dispatch),
        
    }
  }

 export default connect(mapStateToProps, mapDispatchToProps)(ListCategory)
