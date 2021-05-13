import React from 'react'
import {connect} from 'react-redux'
import {fetchStream,deleteStream} from '../../actions'
import Modal from '../Modal'
import history from '../../history'

class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
     
    }
    onDelete=(id)=>{
        this.props.deleteStream(this.props.match.params.id)
    }
    renderActions =()=> {
        return(
            <>
            <button onClick={this.onDelete} className="ui button negative">Delete</button>
            <button onClick={()=>history.push('/')} className="ui button">Cancel</button>
            </>
        )
    }
    renderContent=()=>{
      
        if(!this.props.stream){
            return "Are you sure to delete this stream?"
        }
        return `Are you sure to delete the stream with title: ${this.props.stream.title}?`
    } 
    render(){
       
        return(
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={()=>history.push('/')}
            />
        )
    }
}
const mapStateToProps=(state,ownProps)=>{
    return{stream:state.streams[ownProps.match.params.id]}
}
export default connect(
    mapStateToProps,
    {fetchStream,deleteStream}
)(StreamDelete)