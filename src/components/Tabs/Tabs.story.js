import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as knobs from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';

import { Tabs, TabList, TabPanel, Tab } from '../..';

const sizeMap = {
  desktop: '80px',
  mobile: '64px'
};

const StyledTabList = styled(TabList)`
  height: ${props => sizeMap[props.size]};
  padding: 0 ${props => (props.extraPadding ? '16px' : 0)};
  color: #090909;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 12px;
`;

const tabsExample = [
  { tab: 'Tab 1', content: 'Content 1' },
  { tab: 'Tab 2', content: 'Content 2' },
  { tab: 'Tab 3', content: 'Content 3' },
  { tab: 'Tab 4', content: 'Content 4' }
];

class TabsComposed extends Component {
  state = { selectedIndex: 0 };

  render() {
    const { size, extraPadding, stretched } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Fragment>
        <StyledTabList
          stretched={stretched}
          size={size}
          extraPadding={extraPadding}
        >
          {tabsExample.map(({ tab }, index) => (
            <Tab
              key={index}
              selected={index === selectedIndex}
              onClick={() => this.setState({ selectedIndex: index })}
            >
              {tab}
            </Tab>
          ))}
        </StyledTabList>
        <StyledTabPanel>{tabsExample[selectedIndex].content}</StyledTabPanel>
      </Fragment>
    );
  }
}

TabsComposed.propTypes = {
  size: PropTypes.string.isRequired,
  extraPadding: PropTypes.bool.isRequired,
  stretched: PropTypes.bool.isRequired
};

storiesOf(`${GROUPS.COMPONENTS}|Tabs`, module)
  .addDecorator(withTests('Tabs'))
  .add(
    'Tabs',
    withInfo()(() => (
      <div style={{ width: '600px' }}>
        <TabsComposed
          size={knobs.select(
            'with external CSS: size',
            ['desktop', 'mobile'],
            'desktop'
          )}
          extraPadding={knobs.boolean(
            'with external CSS: extra padding',
            false
          )}
          stretched={knobs.boolean('stretched', false)}
        />
      </div>
    ))
  )
  .add(
    'Tabs: Links',
    withInfo()(() => (
      <div style={{ width: '600px' }}>
        <Fragment>
          <TabList>
            <Tab selected>Home</Tab>
            <Tab as="a" href="https://www.google.com" target="_blank">
              Page #1
            </Tab>
            <Tab as="a" href="https://www.google.com" target="_blank">
              Page #2
            </Tab>
          </TabList>
        </Fragment>
      </div>
    ))
  )
  .add(
    'Tabs: Stateful',
    withInfo()(() => (
      <div style={{ width: '600px' }}>
        <Tabs
          items={[
            { id: 'one', tab: 'Tab 1', panel: 'Content 1' },
            { id: 'two', tab: 'Tab 2', panel: 'Content 2' },
            { id: 'three', tab: 'Tab 3', panel: 'Content 3' },
            { id: 'four', tab: 'Tab 4', panel: 'Content 4' }
          ]}
        />
      </div>
    ))
  );
