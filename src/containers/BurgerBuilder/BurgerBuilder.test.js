import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder 
      onInitIngredients={() => {}}
      onInitAuthCheckState={() => {}} />)
  })

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ 
      ingredients: [{
        ingredient: 'salad', amount: 0, price: 0.7, 
      },]
    });

    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
})
