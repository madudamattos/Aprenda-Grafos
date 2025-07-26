import React from 'react'
import './Body.css'
import '../ButtonMainPage/ButtonMainPage.css'
import ButtonMainPage from '../ButtonMainPage/ButtonMainPage'

const Body = () => {
  return (
    <section className='container_body'>
      <div className='main_div_body'>
        <div className='canvas_body'>

        </div>
        <div className='text_code_container'>
          <div className='container_button_code'>
            <ButtonMainPage id='button_main_page'>Botao</ButtonMainPage>
            <ButtonMainPage id='button_main_page2'>Botao2</ButtonMainPage>

          </div>
          <div className='code_body'>
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