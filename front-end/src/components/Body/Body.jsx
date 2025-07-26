import React from 'react'
import './Body.css'
import '../ButtonMainPage/ButtonMainPage.css'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'
import AnimationControl from '../AnimationControl/AnimationControl'
import ButtonHelp from '../ButtonHelp/ButtonHelp'

const Body = () => {
  return (
    <section className='container_body'>
      <div className='main_div_body'>
        <div className='left_side'>
            <div className='button_container_1'>
              <ButtonMainPage><img className='button_icon' src="/src/assets/icons/list.svg" alt="Lista"/>Grafo</ButtonMainPage>
              <ButtonMainPage><img className='button_icon' src="/src/assets/icons/upload.svg" alt="Subir"/>Subir</ButtonMainPage>
              <ButtonMainPage><img className='button_icon' src="/src/assets/icons/save.svg" alt="Salvar"/>Salvar</ButtonMainPage>
              <ButtonMainPage><img className='button_icon' src="/src/assets/icons/export.svg" alt="Exportar"/>Exportar</ButtonMainPage>
            </div>
                {/* <ButtonHelp className='button_help'/> */}
            <div className='canvas_body'>
                <div className = 'canva'></div>
                <ButtonHelp className='button_help'/>
                <AnimationControl className='animation_control'/>
            </div>
        </div>
        <div className='right_side'>
          <div className='button_container_2'>
            <div className='button_mini_container_1'>
              <ButtonMainPage>Pseudocódigo</ButtonMainPage>
            </div>
            <div className='button_mini_container_2'>
              <ButtonMainPage id='right_button_2'>Explicação</ButtonMainPage>
            </div>
          </div>
          <div className='code_body_container'>
            <div className='code_body_border'>
              <h2 className='code_body_title'>Algoritmo</h2>
              <p className='code_body_text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque semper ornare augue ut aliquam.
                <br></br> Praesent vel nulla et diam sagittis
                pulvinar eu quis libero. Pellentesque quis consequat enim.
                Aliquam sit amet ipsum odio. Phasellus aliquet orci in quam
                fermentum tincidunt. Ut posuere neque nunc, vitae pulvinar
                neque cursus sed. Proin vitae tellus ligula.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>

  )
}

export default Body
