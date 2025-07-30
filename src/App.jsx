import Header from './componentes/header.jsx'
import ICloudComponent from './contenido.jsx'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen flex justify-center items-center px-4 py-6 pt-24 md:pt-28 lg:pt-32">
        <ICloudComponent />
      </main>
    </>
  )
}

export default App
