import React from 'react'
import {connect} from 'react-redux'
import {__signIn,__signOut} from '../actions'

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'801571265631-m0saol066ljfsmnvei1nus8m1p63airb.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }
    onAuthChange=(__isSignedIn)=>{
       if(__isSignedIn){
           this.props.__signIn(this.auth.currentUser.get().getId())
  
       }else{
        this.props.__signOut()
       }
    }
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null
        }else if (this.props.isSignedIn){
            return (
                <button onClick={()=>(this.auth.signOut())} className="ui red google button">
                    <i className="google icon"/>
                        Sign Out 
                </button>
            )
        }else{
            return (
                <button onClick={()=>(this.auth.signIn())} className="ui red google button">
                    <i className="google icon"/>
                        Sign In with Google
                </button>
            )
        }
    }
    render(){
        return <div className="item"> {this.renderAuthButton()}</div>
    }
}
const mapStateToProps = (state)=>{
    return {
        isSignedIn:state.auth.isSignedIn,
        userId:state.auth.userId,
    }
}
export default connect(
    mapStateToProps,
    {__signIn,__signOut}
)(GoogleAuth)