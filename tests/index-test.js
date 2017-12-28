import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import {renderToStaticMarkup as render} from 'react-dom/server'
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import simulant from 'simulant'


import OnClickToggleDisplay from 'src/'

configure({ adapter: new Adapter() });

beforeEach(() => {
  ReactDOM.unmountComponentAtNode(document.body) //avoid issues with keeping the component mounted
})

describe('Hiding content', () => {
  it('does not render inner content by default', () => {
    expect(render(<OnClickToggleDisplay openerNode={(<a>boton</a>)}><div>Test</div></OnClickToggleDisplay>)).toExclude('<div>Test</div>')
  })

  it('Hides content when openerNode is not provided', () => {
    expect(render(<OnClickToggleDisplay><div>Test</div></OnClickToggleDisplay>)).toExclude('Test')
  })


  it('Hides inside content when clicking opener node when already showing content', () => {
    const boton = <a className="opener">boton</a>
    const content = <div>Test</div>
    const outsideContent = shallow(<div>Outside content</div>)
    const wrapper = shallow(
      <OnClickToggleDisplay openerNode={boton}>
        {content}
      </OnClickToggleDisplay>);
    wrapper.find('.opener').parent().simulate('click');
    wrapper.find('.opener').parent().simulate('click');
    expect(render(wrapper)).toExclude('Test');
  });

  it('Hides inside content when clicking somewhere outside of It', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
    ReactDOM.render(
      (<div className="wrapper">
        <div className="outside">Outside content</div>
        <OnClickToggleDisplay openerNode={<a className="opener">boton</a>}>
          <div className="content">Test</div>
        </OnClickToggleDisplay>);
      </div>), document.body)
    simulant.fire(document.getElementsByClassName("opener")[0], 'click')
    simulant.fire(document.getElementsByClassName("outside")[0], 'click')
    expect(document.getElementsByClassName("content")[0]).toNotExist() ;
  });

  it('Hides inside content when clicking somewhere inside but with class passed as closeFromInsideElements', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
    ReactDOM.render(
      (<div className="wrapper">
        <div className="outside">Outside content</div>
        <OnClickToggleDisplay openerNode={<a className="opener">boton</a>} closeFromInsideElements={["closer-button"]}>
          <div className="content">
            <a className="closer-button">button</a>
            <span>Test</span>
          </div>
        </OnClickToggleDisplay>);
      </div>), document.body)
    simulant.fire(document.getElementsByClassName("opener")[0], 'click')
    simulant.fire(document.getElementsByClassName("closer-button")[0], 'click') //clicks the element passed as closeFromInsideElements will remove the content
    expect(document.getElementsByClassName("content")[0]).toNotExist() ;
  });

  it('Hides inside content when clicking somewhere inside but with an Id passed as closeFromInsideElements', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
    ReactDOM.render(
      (<div className="wrapper">
        <div className="outside">Outside content</div>
        <OnClickToggleDisplay openerNode={<a className="opener">boton</a>} closeFromInsideElements={["closer-button"]}>
          <div className="content">
            <a id="closer-button">button</a>
            <span>Test</span>
          </div>
        </OnClickToggleDisplay>);
      </div>), document.body)
    simulant.fire(document.getElementsByClassName("opener")[0], 'click')
    simulant.fire(document.getElementById("closer-button"), 'click') //clicks the element passed as closeFromInsideElements will remove the content
    expect(document.getElementsByClassName("content")[0]).toNotExist() ;
  });

  it('Clicking at outer nodes descendant from nodes with preventFromCloseElements classes will hide the content', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
    ReactDOM.render(
      (<div className="wrapper">
        <div className="outside">Outside content</div>
        <OnClickToggleDisplay openerNode={<a className="opener">boton</a>} preventFromCloseElements={['wrapper']}>
          <div className="content">Test</div>
        </OnClickToggleDisplay>);
      </div>), document.body)
    simulant.fire(document.getElementsByClassName("opener")[0], 'click')
    simulant.fire(document.getElementsByClassName("outside")[0], 'click') //checks clicking at outside and wrapper divs... that are not inside of shown content
    expect(document.getElementsByClassName("content")[0]).toNotExist() ;
  });
})





describe('Showing content', () => {
  it('Shows inside content when opener node is clicked', () => {
    const wrapper = shallow(
      <OnClickToggleDisplay openerNode={<a className="opener">boton</a>}>
        <div>Test</div>
      </OnClickToggleDisplay>);
      wrapper.find('.opener').parent().simulate('click');
      expect(render(wrapper)).toInclude('Test')
    });

    it('Shows inside content when clicking somewhere inside of It', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
      ReactDOM.render(
        (<div className="wrapper">
          <div className="outside">Outside content</div>
          <OnClickToggleDisplay openerNode={<a className="opener">boton</a>}>
            <div className="content">Test</div>
          </OnClickToggleDisplay>);
        </div>), document.body)
      simulant.fire(document.getElementsByClassName("opener")[0], 'click')
      simulant.fire(document.getElementsByClassName("content")[0], 'click')
      expect(document.getElementsByClassName("content")[0]).toExist() ;
    });

    it('Clicking at outer nodes with classes or ids passed as preventFromCloseElements wont hide the content', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
      ReactDOM.render(
        (<div id="wrapper">
          <div className="outside">Outside content</div>
          <OnClickToggleDisplay openerNode={<a className="opener">boton</a>} preventFromCloseElements={['outside','wrapper']}>
            <div className="content">Test</div>
          </OnClickToggleDisplay>);
        </div>), document.body)
      simulant.fire(document.getElementsByClassName("opener")[0], 'click')
      simulant.fire(document.getElementsByClassName("outside")[0], 'click') //checks clicking at outside and wrapper divs... that are not inside of shown content
      simulant.fire(document.getElementById("wrapper"), 'click')
      expect(document.getElementsByClassName("content")[0]).toExist() ;
    });

    it('Clicking at outer nodes inside of nodes with class passed as preventFromCloseElements wont hide the content', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
      ReactDOM.render(
        (<div className="wrapper">
          <div className="outside">Outside content</div>
          <OnClickToggleDisplay openerNode={<a className="opener">boton</a>}
           preventFromCloseElements={['wrapper']}
           checkInnerNodes={true}
           >
            <div className="content">Test</div>
          </OnClickToggleDisplay>);
        </div>), document.body)
      simulant.fire(document.getElementsByClassName("opener")[0], 'click')
      simulant.fire(document.getElementsByClassName("outside")[0], 'click') //the node with outside class is descendant from a node with wrapper as class name
      expect(document.getElementsByClassName("content")[0]).toExist() ;
    });

    it('Clicking at outer nodes inside of nodes with Id passed as preventFromCloseElements wont hide the content', () => { //Enzyme's shallow rendering event handler's works with components "onClick" props... so could not use It here
      ReactDOM.render(
        (<div id="wrapper">
          <div className="outside">Outside content</div>
          <OnClickToggleDisplay
            openerNode={<a className="opener">boton</a>}
            preventFromCloseElements={['wrapper']}
            checkInnerNodes={true}
          >
            <div className="content">Test</div>
          </OnClickToggleDisplay>);
        </div>), document.body)
      simulant.fire(document.getElementsByClassName("opener")[0], 'click')
      simulant.fire(document.getElementsByClassName("outside")[0], 'click') //the node with outside class is descendant from a node with wrapper as class name
      expect(document.getElementsByClassName("content")[0]).toExist() ;
    });


    describe('on opening', () => {
      it('fires onOpening function when content is shown', () => {
        const logging = function(){
          console.log("manu")
        }
        const spied = sinon.spy(logging)
        const boton = <a className="opener">boton</a>
        const content = <div>Test</div>
        const wrapper = shallow(
          <OnClickToggleDisplay openerNode={boton} onOpening={spied}>
            {content}
          </OnClickToggleDisplay>);
        wrapper.find('.opener').parent().simulate('click');
        sinon.assert.called(spied);
      })
      it('adds the open class to the opener node', () => {
        const boton = <a className="opener">boton</a>
        const content = <div>Test</div>
        const wrapper = shallow(
          <OnClickToggleDisplay openerNode={boton}>
            {content}
          </OnClickToggleDisplay>);
        wrapper.find('.opener').parent().simulate('click');
        expect(wrapper.find('.open-content').length).toEqual(1);
      })

    });






});
