
import React from 'react'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'

const ButtonContainer1 = ({ f1, f2, f3 }) => {
  return (
    <div className='button_container_1'>
      <ButtonMainPage>
        <img className='button_icon' src="/src/assets/icons/list.svg" alt="Lista"/>
        Grafo
      </ButtonMainPage>
      <ButtonMainPage onClick={f1}>
        <img className='button_icon' src="/src/assets/icons/upload.svg" alt="Subir"/>
        Carregar
      </ButtonMainPage>
      <ButtonMainPage onClick={f2}>
        <img className='button_icon' src="/src/assets/icons/save.svg" alt="Salvar"/>
        Salvar
      </ButtonMainPage>
      <ButtonMainPage onClick={f3}>
        <img className='button_icon' src="/src/assets/icons/clear2.svg" alt="Limpar"/>
        Limpar
      </ButtonMainPage>
    </div>
  )
}

export default ButtonContainer1
