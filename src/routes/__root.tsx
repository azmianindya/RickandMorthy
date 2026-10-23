import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createRootRoute({
  component: () => {
     return (
      <React.Fragment>
        <Header />
        <Outlet />
      </React.Fragment>
    )
  }

})
