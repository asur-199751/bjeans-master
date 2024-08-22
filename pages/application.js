import React from 'react'
import LayoutTwo from '../components/LayoutTwo'
import ApplicationMain from '../components/ApplicationMain'
import { HeadData } from '../components/Head'

const Application = () => {
  return (
    <LayoutTwo>
      <HeadData />
      <ApplicationMain />
    </LayoutTwo>
  )
}

export default Application
