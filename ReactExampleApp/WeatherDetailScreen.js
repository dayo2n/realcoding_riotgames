import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// need api key from https://api.openweathermap.org/
const API_KEY = {my_API_key};
const queryUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

export default class WeatherDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const {
      route: {
        params: { city },
      },
    } = this.props;

    fetch(queryUrl(city))
      .then(response => response.json())
      .then(info => {
        console.log(info);
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    const {
      route: {
        params: { city },
      },
      navigation,
    } = this.props;

    navigation.setOptions({ title: `Weather Information: ${city}` });

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{city}</Text>
        <Text style={styles.text}>날씨: {celsius.toFixed(1)} ℃</Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});