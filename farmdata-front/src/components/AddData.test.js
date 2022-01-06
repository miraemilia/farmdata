import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import AddData from './AddData'

test('createMeasurements is called once', () => {
  const createMeasurement = jest.fn()

  const farms = [
    {
      _id: '5a422a851b54a676234d17f4',
      name: 'Noora\'s farm',
      measurements: []
    }
  ]

  const component = render(<AddData farms={farms} createMeasurement={createMeasurement}/>)

  const form = component.container.querySelector('#addDataForm')

  fireEvent.submit(form)

  expect(createMeasurement.mock.calls).toHaveLength(1)
})

test('createMeasurement is called with correct parameters', () => {
  const createMeasurement = jest.fn()

  const farms = [
    {
      _id: '5a422a851b54a676234d17f4',
      name: 'Noora\'s farm',
      measurements: []
    }
  ]

  const component = render(<AddData farms={farms} createMeasurement={createMeasurement} />)

  const form = component.container.querySelector('#addDataForm')
  const farm = component.container.querySelector('#selectFarm')
  const metricType = component.container.querySelector('#selectType')
  const metricValue = component.container.querySelector('#metricValue')

  fireEvent.change(farm, {
    target: { value: 'Noora\'s farm' }
  })

  fireEvent.change(metricType, {
    target: { value: 'rainFall' }
  })

  fireEvent.change(metricValue, {
    target: { value: 35 }
  })

  fireEvent.submit(form)

  expect(createMeasurement.mock.calls[0][0].farm).toBe('Noora\'s farm')
  expect(createMeasurement.mock.calls[0][0].type).toBe('rainFall')
  expect(createMeasurement.mock.calls[0][0].value).toBe('35')

})