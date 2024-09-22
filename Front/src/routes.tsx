import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/login'
import HomeFuncionario from './components/funcionarios/navecaoFuncionario'
import { Pet } from './components/funcionarios/servicos/pet'
import { DefaultLayout } from './components/funcionarios/DefaultLayout'
import { Agendar } from './components/funcionarios/servicos/agendar'
import { HomeEmploye } from './components/funcionarios/homeEmploye'
import { Clientes } from './components/funcionarios/clientes'
import { MainTab } from './components/funcionarios/servicos/agendar/mainTab'
import { AgendamentoVeterinario } from './components/funcionarios/servicos/agendaVet'



export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route path='/homeEmployee' element={<DefaultLayout />}>
        <Route index element={<HomeFuncionario />} />
        <Route path='pet' element={<Pet />} />
        <Route path='agendar' element={<MainTab />} />
        <Route path='homeEmploye' element={<HomeEmploye />} /> //
        <Route path='clientes' element={<Clientes />} />
        <Route path='agendar-veterinaria' element={<AgendamentoVeterinario />} />
      </Route>

    </Routes>
  )
}