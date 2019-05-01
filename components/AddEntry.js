import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import SliderFit from './SliderFit'
import Stepper from './Stepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

export default class AddEntry extends React.Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState(currState => {
      const count = currState[metric] + step

      return {
        ...currState,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = metric => {
    this.setState(currState => {
      const count = currState[metric] - getMetricMetaInfo(metric).step

      return {
        ...currState,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    //todo: Update Redux
    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    })

    //todo:  Navigate to home
    //todo: save to DB
    //todo: clear local notifications
  }

  reset = () => {
    const key = timeToString()

    //todo: update redux , route to home , DB
  }
  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name="ios-happy" size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }
    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider' ? (
                <SliderFit
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Stepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                />
              )}
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}
