import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../actions'

export default function connectComponent({ mapStateToProps, mapDispatchToProps, mergeProps, component }) {
    return connect(
        mapStateToProps || function(state) {
            return {}
        },
        mapDispatchToProps || function(dispatch) {
            return {
                actions: bindActionCreators(actions, dispatch),
            }
        },
        mergeProps, {
            withRef: true,
        }
    )(component)
}
