import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import DataRow from './DataRow'

test('renders farm name', () => {
  const data = {
    farm: {
      id: 'jw34tgk87577g',
      name: 'John\'s farm'
    },
    date: '2022-01-04T18:33:56.486+00:00',
    type: 'rainFall',
    value: 56
  }

  const component = render(
    <DataRow d={data} />
  )

  expect(component.container).toHaveTextContent(
    'John\'s farm'
  )
})