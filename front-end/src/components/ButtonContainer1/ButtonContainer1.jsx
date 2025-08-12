
import React from 'react'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'
import './ButtonContainer1.css'

const ButtonContainer1 = ({activeTab, f1, f2, f3, f4}) => {
  const [showMenu, setMenu] = React.useState(false);
  
  const toggleMenu = () => {
    setMenu(!showMenu);
  }

  return (
    <div className='button_container_1'>
      <ButtonMainPage onClick={toggleMenu} disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/list.svg" alt="Lista"/>
        Grafo
      </ButtonMainPage>
      <ButtonMainPage onClick={activeTab === 'pseudocode' ? f2 : undefined} disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/upload.svg" alt="Subir"/>
        Carregar
      </ButtonMainPage>
      <ButtonMainPage onClick={activeTab === 'pseudocode' ? f3 : undefined} disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/save.svg" alt="Salvar"/>
        Salvar
      </ButtonMainPage>
      <ButtonMainPage onClick={activeTab === 'pseudocode' ? f4 : undefined} disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/clear2.svg" alt="Limpar"/>
        Limpar
      </ButtonMainPage>
      {showMenu === true && (
        <div className='context-menu-options'>
          <button onClick={() => { f1('/grafos/grafo0.json'); toggleMenu(); }}>Novo Grafo</button>
          <button onClick={() => { f1('/grafos/grafo1.json'); toggleMenu(); }}>Grafo 1</button>
          <button onClick={() => { f1('/grafos/grafo2.json'); toggleMenu(); }}>Grafo 2</button>
        </div>
      )}
    </div>
  )
}

export default ButtonContainer1
