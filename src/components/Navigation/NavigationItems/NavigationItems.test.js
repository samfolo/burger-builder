import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = shallow(<NavigationItems isLoggedIn />)
})
describe('< NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {  
    wrapper.setProps({ isLoggedIn: false }); 
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    expect(wrapper.contains(<NavigationItem link='/sign-out'>Sign Out</NavigationItem>)).toBe(true);
  });
});
