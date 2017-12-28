import React from 'react'
import Proptypes from 'prop-types'

/* This components is useful for showing some content whenever you want.
If only the required props are passed, the content will close if you click outside of It.
props ->
openerNode: is the node that onClick opens up the node passed by the content prop. It is required
preventFromCloseElements: It's an array of strings. each string represents an Id or a ClassName. If you click on an element with one of these strings
as id or class, the popover will not close (event if It is outside the popover)
preventInsideOfElements: works like preventFromCloseElements. The important difference is that if you click on an element that is INSIDE an element with
any of the strings passed as id or class, then It will not close (even if It is not outside the popover)
closeFromInsideElements: It's an array of strings. As It's name suggests, if you click on an element with class or id that is the same as one of the
strings passed, then the popover will hide
onOpening: expects a function that will be fired when content is shown
*/

export default class OnClickToggleDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    // this binding is for keeping the component context and calling refs, props, state...
    this.checkClickLocation = this.checkClickLocation.bind(this)
  }

  toggleClickListener () {
    if (!this.state.show) {
      document.addEventListener('click', this.checkClickLocation, false)
    } else {
      document.removeEventListener('click', this.checkClickLocation, false)
    }
  }

  toggleAeroPopover () {
    if (this.props.onOpening && !this.state.show) {
      this.props.onOpening()
    }
    this.toggleClickListener()
    this.setState({
      show: !this.state.show
    })
  }

  checkClickLocation (e) { // fires on every click when popover is open.
    if (!this.checkCloseFromInsideElement(e.target) && // if user did not click in any closeFromInsideElements passed as prop
       ((this.refs.popover && this.refs.popover.contains(e.target)) || // checks if is clicking inside of content
         this.checkPreventCloseNodes(e.target) ||
         this.checkInnerNodes(e.target))) {
      return
    }
    this.toggleAeroPopover()
  }

  checkInnerNodes (target) { // you can pass as prop all the ids you want to check if you clicked inside
    if (!this.props.checkInnerNodes) {
      return false
    }
    return this.props.preventFromCloseElements.some((idOrClass) => {
      const elementToCheck = document.getElementById(idOrClass) ? document.getElementById(idOrClass) : document.getElementsByClassName(idOrClass)[0]
      return (elementToCheck && elementToCheck.contains(target))
    })
  }

  checkPreventCloseNodes (target) { // you can pass as prop all the ids you want the popover prevent from closing
    if ((!target.id && !target.className) || !this.props.preventFromCloseElements) {
      return false
    } else {
      const targetElement = target.id ? target.id : target.className
      return this.props.preventFromCloseElements.some((idOrClass) => {
        return targetElement === idOrClass
      })
    }
  }

  checkCloseFromInsideElement (target) {
    if ((!target.id && !target.className) || !this.props.closeFromInsideElements) {
      return false
    } else {
      const targetElement = target.id ? target.id : target.className
      return this.props.closeFromInsideElements.some((idOrClass) => {
        return targetElement === idOrClass
      })
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.checkClickLocation, false)
  }

  render () {
    const openerClass = this.state.show ? 'open-content' : ''
    return (
      <div className={this.props.containerClass || ''}>
        <div ref="popover">
          {this.state.show && this.props.children}
        </div>
        <div ref="openerNode" onClick={() => this.toggleAeroPopover()} className={openerClass}>
          {this.props.openerNode}
        </div>
      </div>
    )
  }
}

OnClickToggleDisplay.propTypes = {
  openerNode: Proptypes.node.isRequired,
  preventFromCloseElements: Proptypes.arrayOf(Proptypes.string),
  preventInsideOfElements: Proptypes.arrayOf(Proptypes.string),
  closeFromInsideElements: Proptypes.arrayOf(Proptypes.string)
}
