
import React from 'react'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'

const ButtonContainer1 = ({activeTab, f1, f2, f3 }) => {
  return (
    <div className='button_container_1'>
      <ButtonMainPage disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/list.svg" alt="Lista"/>
        Grafo
      </ButtonMainPage>
      <ButtonMainPage onClick={activeTab === 'pseudocode' ? f1 : undefined} disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/upload.svg" alt="Subir"/>
        Carregar
      </ButtonMainPage>
      <ButtonMainPage onClick={activeTab === 'pseudocode' ? f2 : undefined} disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/save.svg" alt="Salvar"/>
        Salvar
      </ButtonMainPage>
      <ButtonMainPage onClick={activeTab === 'pseudocode' ? f3 : undefined} disabled = {activeTab === 'pseudocode'}>
        <img className='button_icon' src="/src/assets/icons/clear2.svg" alt="Limpar"/>
        Limpar
      </ButtonMainPage>
    </div>
  )
}

export default ButtonContainer1
