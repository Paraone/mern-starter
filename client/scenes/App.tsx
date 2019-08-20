import React from 'react'
import Helmet from 'react-helmet'

type Props = {
  children?: any;
}

export default function App (props: Props) {
  return (
    <div className='stretch'>
      <div className='stretch'>
        <Helmet
          title='The Boilerplate'
          titleTemplate='%s'
          meta={[
            { charSet: 'utf-8' },
            {
              content: 'IE=edge'
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1'
            }
          ]}
        />
        <div className='stretch'>{props.children}</div>
      </div>
    </div>
  )
}
