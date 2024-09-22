import React from 'react'
import HomeFuncionario from '../navecaoFuncionario'
import { Outlet } from 'react-router-dom'

export const DefaultLayout = () => {
  return (
    <div>
      <HomeFuncionario />
      <Outlet />
    </div>
  )
}
