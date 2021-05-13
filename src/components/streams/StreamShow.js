import React from 'react'
import {connect} from 'react-redux'
import {fetchStream} from '../../actions'

class StreamShow extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }
    render(){
        if(!this.props.stream){
            return null
        }
        return (
            <div>
                Show
                {this.props.stream.title}
            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return{stream:state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps,{fetchStream})(StreamShow)