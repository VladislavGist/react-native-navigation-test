import React from 'react';
import {Button, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="black"
        />
      ),
    };
  };

  state = {
    count: 0,
  };

  componentDidMount() {
    this.props.navigation.setParams({increaseCount: this._increaseCount});
  }

  _increaseCount = () => {
    this.setState({count: this.state.count + 1});
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'string text',
            })
          }
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30}}>This is a modal!</Text>
        <Button
          title="back"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  render() {
    const {navigation} = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Details Screen</Text>

        <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>

        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>

        <Button
          title="Go to Details again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />

        <Button
          title="Go to home"
          onPress={() => this.props.navigation.popToTop()}
        />

        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class LogoTitle extends React.Component {
  render() {
    return <Text>***</Text>;
  }
}

const MainStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    MyModal: ModalScreen,
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
