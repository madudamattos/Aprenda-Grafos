import React from 'react'
import '../TextComponent.css'
import { useLocation } from 'react-router-dom';
import explicacoes from '../../../mocks/explicacoes.json'

const ExplanationComponent = ({ routeName }) => {
  const location = useLocation();
  const selectedExplicacao = explicacoes.find(p => p.id === routeName);

  // const[selected, setSelected] = React.useState(null);
  const selectedId = 3;
  const selectedLine = "p" + selectedId.toString();

  return (
    <div className='code_container'>
      {selectedExplicacao.content && selectedExplicacao.content.length > 0 &&
        Object.keys(selectedExplicacao.content)
        .map(key => {
          return (
              <div key={key}>
                <h2 className='code_body_title'>{selectedExplicacao.content[key].titulo}</h2>
                <pre className='code_body_text_explanation'>{selectedExplicacao.content[key].texto}</pre>
              </div>
          );
        })
      }
    </div>
  )
}

export default ExplanationComponent
